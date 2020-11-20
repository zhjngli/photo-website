import React from "react";
import style from './style.module.scss';

class About extends React.Component {
  componentDidMount() {
    window.gtag('config', 'G-R0M2056RBS', {
      'page_title' : 'about',
      'page_path': '/about'
    });
  }

  render () {
    return (
      <div className={style.container}>
        <p className={style.text}>
          Hello! After picking up a camera, I quickly gravitated towards photography characterized by hard light and shadows, anonymity and abstraction. I'm still developing my vision, finding my style, and enjoying the process. Thank you for joining me on this journey!
        </p>
      </div>
    );
  }
}

export default About;
