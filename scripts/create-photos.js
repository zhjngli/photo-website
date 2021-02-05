const fs = require('fs');
const webp = require('webp-converter');
const sizeOf = require('image-size');

const photosDir = 'src/assets/photos';
const photosTs = 'src/page/photos.ts';

// Read photos
const photos = fs
  .readdirSync(photosDir, { withFileTypes: true })
  .filter((p) => p.isFile() && p.name.endsWith('.jpg'))
  .reverse()
  .map((p, i) => {
    const name = p.name.split('.');
    const nameWithoutExt = name[0];
    return {
      jpegName: p.name,
      jpegImportName: `jpeg${i}`,
      webpName: nameWithoutExt.concat('.webp'),
      webpImportName: `webp${i}`
    };
  });
console.log(`All photos:\n${photos.map(JSON.stringify).join('\n')}\n\n`);

// Convert existing jpegs to webps
// webp.grant_permission();
console.log(`Converting existing jpegs in ${photosDir} to webps.\n\n`);
photos.forEach((p) => {
  const result = webp.cwebp(`${photosDir}/${p.jpegName}`, `${photosDir}/${p.webpName}`, '-q 90 -metadata all');
  result.then((response) => {
    console.log(response);
  });
});

// Create content to write
const importStatements = photos
  .map((p) => {
    return `import ${p.jpegImportName} from '../assets/photos/${p.jpegName}';\nimport ${p.webpImportName} from '../assets/photos/${p.webpName}';`;
  })
  .join('\n');
const constants = `
export type ExtendedPhotoProps = { webpSrc?: string };

const defaultSizes = [
  \`
  (min-width: 480px) 50vw,
  (min-width: 1024px) 33.3vw,
  (max-width: 480px) 90vw
  \`
];
`;
const photosArray = photos
  .map((p) => {
    const dimensions = sizeOf(`${photosDir}/${p.jpegName}`);
    return `{
      src: \`\$\{${p.jpegImportName}\}\`,
      webpSrc: \`\$\{${p.webpImportName}\}\`,
      sizes: defaultSizes,
      width: ${dimensions.width},
      height: ${dimensions.height}
    }`;
  })
  .join(',');

const content = [importStatements, constants, 'export default [', photosArray, '];'].join('\n');

// Write content to photos.ts file
console.log(`Writing ${photosTs}:\n\n${content}`);
try {
  fs.writeFileSync(photosTs, content);
} catch (err) {
  console.error(`Error occurred when writing ${photosTs}: ${err}`);
  process.exit(1);
}