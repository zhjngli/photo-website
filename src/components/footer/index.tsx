import React from 'react';

import style from './style.module.scss';

class Footer extends React.Component {
  render(): React.ReactNode {
    return <footer className={style.container}>&copy; 2021.</footer>;
  }
}

export default Footer;
