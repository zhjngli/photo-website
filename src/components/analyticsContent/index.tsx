import React from "react";
import AnalyticsContentProps from "./types";

class AnalyticsContent extends React.Component<AnalyticsContentProps> {
  componentDidMount() {
    // console.log("location: ", window.location.href);
    // console.log("gtagging from: ", this.props.pageTitle, this.props.pagePath);
    window.gtag('config', 'G-R0M2056RBS', {
      'page_title' : this.props.pageTitle,
      'page_path': this.props.pageTitle
    });
  }

  // Not super sure about this pattern. I use AnalyticsContent both with inheritance and composition
  // to get my desired effect of emitting analytics. Might be worth investigating a more pure functional
  // way to do this.
  // I created this component to reduce duplicate code of the gtag function call, but maybe it's worth
  // keeping the gtag call in all components which use it, assuming there's more complex analytics
  // functionality that I might to use in the future.
  render() {
    return <></>;
  }
}

export default AnalyticsContent;