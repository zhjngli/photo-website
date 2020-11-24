import React from "react";
import { NavLink } from "react-router-dom";
import withAnalytics from '../analyticsContent';
import style from './style.module.scss';

class NotFound extends React.Component {
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

export default withAnalytics(NotFound);
