import clouds from './assets/photos/201910-diagonalcloud.jpg';

export const photos = [
  {
    // horizontal
    src: `${clouds}`,
    srcSet: [
      `${clouds}?nf_resize=fit&w=1080 1080w`
    ],
    sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
    width: 3,
    height: 2
  }
];
