import React from 'react';

import style from './style.module.scss';

class Footer extends React.Component {
  render(): React.ReactNode {
    const year = new Date().getFullYear();
    return <footer className={style.container}>&copy; {year}.</footer>;
  }
}

export default Footer;
