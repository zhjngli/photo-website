import React from "react";
import style from './style.module.scss';

class Contact extends React.Component {
  componentDidMount() {
    window.gtag('config', 'G-R0M2056RBS', {
      'page_title' : 'contact',
      'page_path': '/contact'
    });
  }

  render() {
    return (
      <div className={style.container}>
        <p className={style.text}>
          Let's create something!
        </p>
        <p className={style.text}>
          Message me on <a href="https://www.instagram.com/zhjngli/" target="_blank" rel="noreferrer noopener" className={style.link}>Instagram</a>.
        </p>
      </div>
    );
  }
}

export default Contact;
