import React from "react";
import style from './style.module.scss';

function Header() {
  return (
    <div className={style.navbar}>
      <span className={style.title}>zhijiang li</span>
      <span className={style.pages}>about</span>
      <span className={style.pages}>contact</span>
      <span>
        <a href="https://www.instagram.com/zhjngli/" target="_blank" rel="noreferrer noopener" className={style.pages}>
          instagram
        </a>
      </span>
    </div>
  );
}

export default Header;
