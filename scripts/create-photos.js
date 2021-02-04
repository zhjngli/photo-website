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
    return {
      name: p.name,
      importName: `p${i}`
    };
  });
console.log(`All photos:\n${photos.map(JSON.stringify).join('\n')}\n\n`);

// Convert existing jpegs to webps
// webp.grant_permission();
console.log(`Converting existing jpegs in ${photosDir} to webps.\n\n`);
photos.forEach((photo) => {
  const p = photo.name.split('.');
  const result = webp.cwebp(`${photosDir}/${photo.name}`, `${photosDir}/${p[0]}.webp`, '-q 90 -metadata all');
  result.then((response) => {
    console.log(response);
  });
});

// Create content to write
const importStatements = photos
  .map((photo) => {
    return `import ${photo.importName} from '../assets/photos/${photo.name}';`;
  })
  .join('\n');
const defaultSizes = `
const defaultSizes = [
  \`
  (min-width: 480px) 50vw,
  (min-width: 1024px) 33.3vw,
  (max-width: 480px) 90vw
  \`
];
`;
const photosArray = photos
  .map((photo) => {
    const dimensions = sizeOf(`${photosDir}/${photo.name}`);
    return `{
    src: \`\$\{${photo.importName}\}\`,
    sizes: defaultSizes,
    width: ${dimensions.width},
    height: ${dimensions.height}
  }`;
  })
  .join(',');

const content = [importStatements, defaultSizes, 'export default [', photosArray, '];'].join('\n');

// Write content to photos.ts file
console.log(`Writing ${photosTs}:\n\n${content}`);
try {
  fs.writeFileSync(photosTs, content);
} catch (err) {
  console.error(`Error occurred when writing ${photosTs}: ${err}`);
  process.exit(1);
}
