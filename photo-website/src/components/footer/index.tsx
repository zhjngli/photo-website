import React from "react";
import style from './style.module.scss';
import { Instagram, Copyright } from '@material-ui/icons';


function Footer() {
  return (
    <div className={style.container}>
      <Copyright />
      <div className={style.year}>2020</div>
    </div>
  );
}

export default Footer;
