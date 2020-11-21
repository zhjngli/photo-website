import React from "react";
import { NavLink } from "react-router-dom";
import AnalyticsContent from '../analyticsContent';
import style from './style.module.scss';

class NotFound extends AnalyticsContent {
  render () {
    return (
      <div className={style.container}>
        <p className={style.text}>
          Sorry, content not found! Go to <NavLink to="/" className={style.link}>home</NavLink>.
        </p>
      </div>
    );
  }
}

export default NotFound;
