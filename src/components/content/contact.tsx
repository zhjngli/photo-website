import React from "react";
import AnalyticsContent from '../analyticsContent';
import InstaLink from '../instaLink';
import style from './style.module.scss';

class Contact extends AnalyticsContent {
  render() {
    return (
      <div className={style.container}>
        <p className={style.text}>
          Let's create something!
        </p>
        <p className={style.text}>
          Message me on <InstaLink style={style.link} />.
        </p>
      </div>
    );
  }
}

export default Contact;
