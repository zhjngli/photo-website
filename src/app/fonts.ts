import localFont from 'next/font/local';

export const hindMadurai = localFont({
  src: [
    {
      path: '../../public/fonts/hind-madurai-v6-latin-300.eot',
      weight: '300'
    },
    // {
    //   path: '../../public/fonts/hind-madurai-v6-latin-300.svg',
    //   weight: '300'
    // },
    {
      path: '../../public/fonts/hind-madurai-v6-latin-300.ttf',
      weight: '300'
    },
    {
      path: '../../public/fonts/hind-madurai-v6-latin-300.woff',
      weight: '300'
    },
    {
      path: '../../public/fonts/hind-madurai-v6-latin-300.woff2',
      weight: '300'
    }
  ],
  variable: '--font-hind-madurai'
});

export const notoSerif = localFont({
  src: [
    {
      path: '../../public/fonts/noto-serif-v9-latin-ext_latin-regular.eot',
      weight: '400'
    },
    // {
    //   path: '../../public/fonts/noto-serif-v9-latin-ext_latin-regular.svg',
    //   weight: '400'
    // },
    {
      path: '../../public/fonts/noto-serif-v9-latin-ext_latin-regular.ttf',
      weight: '400'
    },
    {
      path: '../../public/fonts/noto-serif-v9-latin-ext_latin-regular.woff',
      weight: '400'
    },
    {
      path: '../../public/fonts/noto-serif-v9-latin-ext_latin-regular.woff2',
      weight: '400'
    }
  ],
  variable: '--font-noto-serif'
});
