import React from "react";
import AnalyticsContentProps from "./types";

function withAnalytics<P>(Component: React.ComponentType<P>) {
  return class extends React.Component<P & AnalyticsContentProps> {
    componentDidMount() {
      // console.log("location: ", window.location.href);
      // console.log("gtagging from: ", this.props.pageTitle, this.props.pagePath);
      window.gtag('config', 'G-R0M2056RBS', {
        'page_title' : this.props.pageTitle,
        'page_path': this.props.pageTitle
      });
    }

    render() {
      return <Component {...this.props} />;
    }
  }
}

export default withAnalytics;
