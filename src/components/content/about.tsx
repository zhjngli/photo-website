import React from "react";
import style from './style.module.scss';

class About extends React.Component {
  render () {
    return (
      <div className={style.container}>
        <p className={style.text}>
          Zhijiang loves the unique perspectives a camera and lens brings to the world. He hopes to develop and share his own vision through his work.
        </p>
      </div>
    );
  }
}

export default About;
