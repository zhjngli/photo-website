import React from "react";
import AnalyticsContent from '../analyticsContent';
import style from './style.module.scss';

class About extends AnalyticsContent {
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
