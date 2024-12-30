import React from 'react';
import Link from 'next/link';

import { shopURL } from '../shop/data';
import InstaLink from './instalink';
// import style from './header-style.module.scss';

export default function Header() {
  return (
    <header>
      <Link href="/">ƶhijiang li</Link>
      <nav>
        {/* activeClassName={style.activeLink} from src/components/content/style.module.scss */}
        <Link href="/about">about</Link>
        {/* activeClassName={style.activeLink} from src/components/content/style.module.scss */}
        <Link href="/contact">contact</Link>
        <Link href={shopURL} target="_blank" rel="noreferrer noopener">
          shop
        </Link>
        <InstaLink text={'instagram'} />
      </nav>
    </header>
  );
}
