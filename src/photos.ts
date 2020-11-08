import clouds from './photos/201910-cloudbloom.jpg';

export const photos = [
  {
    // vertical
    src: `${clouds}`,
    srcSet: [
      `${clouds}?nf_resize=fit&w=1080 1080w`
    ],
    sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
    width: 2,
    height: 3
  }
];
