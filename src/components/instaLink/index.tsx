import React from 'react';

type InstaLinkProps = {
  style: string;
};

class InstaLink extends React.Component<InstaLinkProps> {
  onClick(): void {
    window.gtag('event', 'click', {
      event_category: 'outbound',
      event_label: 'instagram',
      transport_type: 'beacon'
    });
  }

  render(): React.ReactNode {
    return (
      <a
        href="https://www.instagram.com/zhjngli/"
        target="_blank"
        rel="noreferrer noopener"
        onClick={this.onClick}
        className={this.props.style}
      >
        Instagram
      </a>
    );
  }
}

export default InstaLink;
