import React from "react";
import style from './style.module.scss';

function Header() {
  return (
    <div className={style.navbar}>
      <span className={style.title}>zhijiang li</span>
      <span className={style.pages}>about</span>
      <span className={style.pages}>contact</span>
    </div>
  );
}

export default Header;
