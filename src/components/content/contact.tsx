import React from "react";
import withAnalytics from '../analyticsContent';
import AnalyticsContentProps from "../analyticsContent/types";
import InstaLink from '../instaLink';
import style from './style.module.scss';

class Contact extends React.Component {
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

export const ContactPageDefinitions: AnalyticsContentProps = {
  pageTitle: 'contact',
  pagePath: '/contact'
}

export default withAnalytics(Contact, ContactPageDefinitions);
