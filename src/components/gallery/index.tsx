import React from 'react';
import Gallery from 'react-photo-gallery';

import photos from '../../photos';
import commonStyle from '../../theme/common.module.scss';
import { photoGalleryMargin, photoGalleryRowHeight, screenReactiveWidth } from '../../theme/dimensions';
import withAnalytics from '../analyticsContent';
import AnalyticsContentProps from '../analyticsContent/types';
import GalleryImage from './galleryImage';

type GalleryState = {
  galleryDirection: string;
};

enum GalleryDirection {
  Row = 'row',
  Col = 'column'
}

class PhotoGallery extends React.Component<Record<string, never>, GalleryState> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      galleryDirection: window.innerWidth <= screenReactiveWidth ? GalleryDirection.Col : GalleryDirection.Row
    };
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize(): void {
    if (window.innerWidth <= screenReactiveWidth && this.state.galleryDirection === GalleryDirection.Row) {
      this.setState((_prevState: GalleryState) => ({
        galleryDirection: GalleryDirection.Col
      }));
    } else if (window.innerWidth > screenReactiveWidth && this.state.galleryDirection === GalleryDirection.Col) {
      this.setState((_prevState: GalleryState) => ({
        galleryDirection: GalleryDirection.Row
      }));
    }
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.handleResize);
  }

  render(): React.ReactNode {
    return (
      <main className={commonStyle.unselectable}>
        <Gallery
          photos={photos}
          direction={this.state.galleryDirection}
          columns={1}
          renderImage={GalleryImage}
          targetRowHeight={photoGalleryRowHeight}
          margin={photoGalleryMargin}
        />
      </main>
    );
  }
}

export const HomePageDefinitions: AnalyticsContentProps = {
  pageTitle: 'home',
  pagePath: '/'
};

export default withAnalytics(PhotoGallery, HomePageDefinitions);
