import React from "react";
import style from './style.module.scss';

function Header() {
  return (
    <div className={style.navbar}>
      <a href="/" className={style.title}>
        zhijiang li
      </a>
      <a href="/about" className={style.pages}>
        about
      </a>
      <a href="/contact" className={style.pages}>
        contact
      </a>
      <a href="https://www.instagram.com/zhjngli/" target="_blank" rel="noreferrer noopener" className={style.pages}>
        instagram
      </a>
    </div>
  );
}

export default Header;
