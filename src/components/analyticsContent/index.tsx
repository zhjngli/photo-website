import React from 'react';

import gtag from '../../gtag';
import AnalyticsContentProps from './types';

function withAnalytics<P>(Component: React.ComponentType<P>, pageDefs: AnalyticsContentProps): React.ComponentClass<P> {
  return class AnalyticsComponent extends React.Component<P> {
    componentDidMount(): void {
      // console.log("location: ", window.location.href);
      // console.log("gtagging from: ", pageDefs.pageTitle, pageDefs.pagePath);
      window.gtag('config', gtag, {
        page_title: pageDefs.pageTitle,
        page_path: pageDefs.pagePath
      });
    }

    render(): React.ReactNode {
      return <Component {...this.props} />;
    }
  };
}

export default withAnalytics;
