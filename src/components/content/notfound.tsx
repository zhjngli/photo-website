import React from 'react';
import { NavLink } from 'react-router-dom';
import withAnalytics from '../analyticsContent';
import AnalyticsContentProps from '../analyticsContent/types';
import { HomePageDefinitions } from '../gallery';
import style from './style.module.scss';

class NotFound extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <p className={`${style.text} ${style.center}`}>
          Sorry, content not found! Go to{' '}
          <NavLink to={HomePageDefinitions.pagePath} className={style.link}>
            home
          </NavLink>
          .
        </p>
      </div>
    );
  }
}

export const NotFoundPageDefinitions: AnalyticsContentProps = {
  pageTitle: 'notfound',
  pagePath: '/notfound'
};

export default withAnalytics(NotFound, NotFoundPageDefinitions);
