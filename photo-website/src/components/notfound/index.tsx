import React from "react";
import style from './style.module.scss';

class NotFound extends React.Component {
  render () {
    return (
      <div className={style.container}>
        <p className={style.text}>
          Sorry, content not found! Go to <a href="/" className={style.link}>home</a>.
        </p>
      </div>
    );
  }
}

export default NotFound;
