import React from 'react';
import { NavLink } from 'react-router-dom';
import withAnalytics from '../analyticsContent';
import AnalyticsContentProps from '../analyticsContent/types';
import InstaLink from '../instaLink';
import { ContactPageDefinitions } from './contact';
import style from './style.module.scss';

class About extends React.Component {
  render() {
    return (
      <main className={style.container}>
        <p className={style.text}>
          Hello! After picking up a camera, I quickly gravitated towards photography characterized by hard light and
          shadows, anonymity and abstraction. I&apos;m still developing my vision, finding my style, and enjoying the
          process.
        </p>
        <p className={style.text}>
          Thanks for following along. Feel free to{' '}
          <NavLink to={ContactPageDefinitions.pagePath} className={style.link}>
            leave a note
          </NavLink>{' '}
          or check out my <InstaLink style={style.link} text={'latest adventures'} />.
        </p>
      </main>
    );
  }
}

export const AboutPageDefinitions: AnalyticsContentProps = {
  pageTitle: 'about',
  pagePath: '/about'
};

export default withAnalytics(About, AboutPageDefinitions);
