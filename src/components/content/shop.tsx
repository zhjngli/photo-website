import React from 'react';
import FadeIn from 'react-fade-in';

import withAnalytics from '../analyticsContent';
import AnalyticsContentProps from '../analyticsContent/types';
import Footer from '../footer';
import style from './style.module.scss';

class Shop extends React.Component {
  componentDidMount(): void {
    window.location.replace(shopURL);
  }

  render(): React.ReactElement {
    return (
      <main className={style.container}>
        <FadeIn>
          <p className={style.text}>Thanks for dropping by! Redirecting to my shop at RedBubble...</p>
          <Footer />
        </FadeIn>
      </main>
    );
  }
}

export const shopURL = 'https://zhjngli.redbubble.com';

export const ShopPageDefinitions: AnalyticsContentProps = {
  pageTitle: 'shop',
  pagePath: '/shop'
};

export default withAnalytics(Shop, ShopPageDefinitions);
