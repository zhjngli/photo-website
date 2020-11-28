import React from "react";
import AnalyticsContentProps from "./types";

function withAnalytics<P>(Component: React.ComponentType<P>, pageDefs: AnalyticsContentProps) {
  return class extends React.Component<P> {
    componentDidMount() {
      // console.log("location: ", window.location.href);
      // console.log("gtagging from: ", pageDefs.pageTitle, pageDefs.pagePath);
      window.gtag('config', 'G-R0M2056RBS', {
        'page_title' : pageDefs.pageTitle,
        'page_path': pageDefs.pageTitle
      });
    }

    render() {
      return <Component {...this.props} />;
    }
  }
}

export default withAnalytics;
