import React from 'react';
import style from './style.module.scss';

class Footer extends React.Component {
  render(): React.ReactNode {
    return <div className={style.container}>&copy; 2020.</div>;
  }
}

export default Footer;
