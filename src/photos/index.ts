import jpeg0 from '../assets/photos/050-202012-down-the-stairs.jpg';
import webp0 from '../assets/photos/050-202012-down-the-stairs.webp';
import jpeg1 from '../assets/photos/045-202511-impressionism.jpg';
import webp1 from '../assets/photos/045-202511-impressionism.webp';
import jpeg2 from '../assets/photos/040-202102-fan-ho-tribute.jpg';
import webp2 from '../assets/photos/040-202102-fan-ho-tribute.webp';
import jpeg3 from '../assets/photos/037-202511-calm-birds.jpg';
import webp3 from '../assets/photos/037-202511-calm-birds.webp';
import jpeg4 from '../assets/photos/035-202411-smoke-break.jpg';
import webp4 from '../assets/photos/035-202411-smoke-break.webp';
import jpeg5 from '../assets/photos/031-202210-christchurch.jpg';
import webp5 from '../assets/photos/031-202210-christchurch.webp';
import jpeg6 from '../assets/photos/028-202210-paris-underground.jpg';
import webp6 from '../assets/photos/028-202210-paris-underground.webp';
import jpeg7 from '../assets/photos/025-202502-vigilante.jpg';
import webp7 from '../assets/photos/025-202502-vigilante.webp';
import jpeg8 from '../assets/photos/023-20210923-rush-hour.jpg';
import webp8 from '../assets/photos/023-20210923-rush-hour.webp';
import jpeg9 from '../assets/photos/021-202509-working-tears.jpg';
import webp9 from '../assets/photos/021-202509-working-tears.webp';
import jpeg10 from '../assets/photos/019-202011-open.jpg';
import webp10 from '../assets/photos/019-202011-open.webp';
import jpeg11 from '../assets/photos/017-202308-seoul-ddp.jpg';
import webp11 from '../assets/photos/017-202308-seoul-ddp.webp';
import jpeg12 from '../assets/photos/015-202210-angel-wings.jpg';
import webp12 from '../assets/photos/015-202210-angel-wings.webp';
import jpeg13 from '../assets/photos/013-202511-budapest-winter.jpg';
import webp13 from '../assets/photos/013-202511-budapest-winter.webp';
import jpeg14 from '../assets/photos/011-202411-fireworks.jpg';
import webp14 from '../assets/photos/011-202411-fireworks.webp';
import jpeg15 from '../assets/photos/010-202308-seoul-ddp-inside.jpg';
import webp15 from '../assets/photos/010-202308-seoul-ddp-inside.webp';
import jpeg16 from '../assets/photos/009-202509-metlife.jpg';
import webp16 from '../assets/photos/009-202509-metlife.webp';
import jpeg17 from '../assets/photos/008-202502-misted-abstract.jpg';
import webp17 from '../assets/photos/008-202502-misted-abstract.webp';
import jpeg18 from '../assets/photos/007-202502-eyes-blocked.jpg';
import webp18 from '../assets/photos/007-202502-eyes-blocked.webp';
import jpeg19 from '../assets/photos/005-202309-venice-skate.jpg';
import webp19 from '../assets/photos/005-202309-venice-skate.webp';
import jpeg20 from '../assets/photos/003-202009-hollywood.jpg';
import webp20 from '../assets/photos/003-202009-hollywood.webp';
import jpeg21 from '../assets/photos/001-201910-clouds.jpg';
import webp21 from '../assets/photos/001-201910-clouds.webp';

import { PhotoProps } from 'react-photo-gallery';

export type ExtendedPhotoProps = { webpSrc?: string; hash?: string };

const defaultSizes = [
  `
  (min-width: 480px) 50vw,
  (min-width: 1024px) 33.3vw,
  (max-width: 480px) 90vw
  `
];

export const photosReverseIndex = {
'118a4b': 0,
'68aeab': 1,
'd739b0': 2,
'3743f2': 3,
'64a38f': 4,
'db88da': 5,
'389c15': 6,
'699cd2': 7,
'95eff7': 8,
'55e3bb': 9,
'5fc7e3': 10,
'e23830': 11,
'c6cbc1': 12,
'b4e51a': 13,
'a85f18': 14,
'31868b': 15,
'59d5ca': 16,
'40fbbd': 17,
'8b5d5e': 18,
'7864a6': 19,
'c1fb95': 20,
'9fdffc': 21
} as Record<string, number>;

export default [
{
      src: `${jpeg0}`,
      webpSrc: `${webp0}`,
      alt: 'down the stairs',
      hash: '118a4b',
      sizes: defaultSizes,
      width: 720,
      height: 1080
    },{
      src: `${jpeg1}`,
      webpSrc: `${webp1}`,
      alt: 'impressionism',
      hash: '68aeab',
      sizes: defaultSizes,
      width: 1365,
      height: 2048
    },{
      src: `${jpeg2}`,
      webpSrc: `${webp2}`,
      alt: 'fan ho tribute',
      hash: 'd739b0',
      sizes: defaultSizes,
      width: 720,
      height: 1080
    },{
      src: `${jpeg3}`,
      webpSrc: `${webp3}`,
      alt: 'calm birds',
      hash: '3743f2',
      sizes: defaultSizes,
      width: 2048,
      height: 1365
    },{
      src: `${jpeg4}`,
      webpSrc: `${webp4}`,
      alt: 'smoke break',
      hash: '64a38f',
      sizes: defaultSizes,
      width: 2048,
      height: 1365
    },{
      src: `${jpeg5}`,
      webpSrc: `${webp5}`,
      alt: 'christchurch',
      hash: 'db88da',
      sizes: defaultSizes,
      width: 720,
      height: 1080
    },{
      src: `${jpeg6}`,
      webpSrc: `${webp6}`,
      alt: 'paris underground',
      hash: '389c15',
      sizes: defaultSizes,
      width: 1080,
      height: 720
    },{
      src: `${jpeg7}`,
      webpSrc: `${webp7}`,
      alt: 'vigilante',
      hash: '699cd2',
      sizes: defaultSizes,
      width: 1365,
      height: 2048
    },{
      src: `${jpeg8}`,
      webpSrc: `${webp8}`,
      alt: 'rush hour',
      hash: '95eff7',
      sizes: defaultSizes,
      width: 1080,
      height: 720
    },{
      src: `${jpeg9}`,
      webpSrc: `${webp9}`,
      alt: 'working tears',
      hash: '55e3bb',
      sizes: defaultSizes,
      width: 1365,
      height: 2048
    },{
      src: `${jpeg10}`,
      webpSrc: `${webp10}`,
      alt: 'open',
      hash: '5fc7e3',
      sizes: defaultSizes,
      width: 1080,
      height: 720
    },{
      src: `${jpeg11}`,
      webpSrc: `${webp11}`,
      alt: 'seoul ddp',
      hash: 'e23830',
      sizes: defaultSizes,
      width: 1080,
      height: 720
    },{
      src: `${jpeg12}`,
      webpSrc: `${webp12}`,
      alt: 'angel wings',
      hash: 'c6cbc1',
      sizes: defaultSizes,
      width: 720,
      height: 1080
    },{
      src: `${jpeg13}`,
      webpSrc: `${webp13}`,
      alt: 'budapest winter',
      hash: 'b4e51a',
      sizes: defaultSizes,
      width: 1365,
      height: 2048
    },{
      src: `${jpeg14}`,
      webpSrc: `${webp14}`,
      alt: 'fireworks',
      hash: 'a85f18',
      sizes: defaultSizes,
      width: 2048,
      height: 1365
    },{
      src: `${jpeg15}`,
      webpSrc: `${webp15}`,
      alt: 'seoul ddp inside',
      hash: '31868b',
      sizes: defaultSizes,
      width: 720,
      height: 1080
    },{
      src: `${jpeg16}`,
      webpSrc: `${webp16}`,
      alt: 'metlife',
      hash: '59d5ca',
      sizes: defaultSizes,
      width: 1365,
      height: 2048
    },{
      src: `${jpeg17}`,
      webpSrc: `${webp17}`,
      alt: 'misted abstract',
      hash: '40fbbd',
      sizes: defaultSizes,
      width: 2048,
      height: 1365
    },{
      src: `${jpeg18}`,
      webpSrc: `${webp18}`,
      alt: 'eyes blocked',
      hash: '8b5d5e',
      sizes: defaultSizes,
      width: 1365,
      height: 2048
    },{
      src: `${jpeg19}`,
      webpSrc: `${webp19}`,
      alt: 'venice skate',
      hash: '7864a6',
      sizes: defaultSizes,
      width: 1080,
      height: 716
    },{
      src: `${jpeg20}`,
      webpSrc: `${webp20}`,
      alt: 'hollywood',
      hash: 'c1fb95',
      sizes: defaultSizes,
      width: 720,
      height: 1080
    },{
      src: `${jpeg21}`,
      webpSrc: `${webp21}`,
      alt: 'clouds',
      hash: '9fdffc',
      sizes: defaultSizes,
      width: 1080,
      height: 720
    }
] as PhotoProps<ExtendedPhotoProps>[];
