import React from "react";
import Gallery from "react-photo-gallery";
import withAnalytics from '../analyticsContent';
import { photos } from "./photos";
import {screenReactiveWidth, photoGalleryMargin, photoGalleryRowHeight} from '../../theme/dimensions';
import Carousel from "../carousel";
import AnalyticsContentProps from "../analyticsContent/types";

type GalleryProps = {}

type GalleryState = {
  currentImage: number,
  viewerIsOpen: boolean,
  galleryDirection: string,
}

enum GalleryDirection {
  Row = 'row',
  Col = 'column',
}

class PhotoGallery extends React.Component<GalleryProps, GalleryState> {
  constructor(props: GalleryProps) {
    super(props);

    this.state = {
      currentImage: 0,
      viewerIsOpen: false,
      galleryDirection: window.innerWidth <= screenReactiveWidth ? GalleryDirection.Col : GalleryDirection.Row
    };
    this.openViewer = this.openViewer.bind(this);
    this.closeViewer = this.closeViewer.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize(): void {
    if (window.innerWidth <= screenReactiveWidth
        && this.state.galleryDirection === GalleryDirection.Row) {
      this.setState((prevState: GalleryState) => ({
        galleryDirection: GalleryDirection.Col
      }));
    } else if (window.innerWidth > screenReactiveWidth
               && this.state.galleryDirection === GalleryDirection.Col) {
      this.setState((prevState: GalleryState) => ({
        galleryDirection: GalleryDirection.Row
      }));
    }
  }

  openViewer(index: number): void {
    this.setState((prevState: GalleryState) => ({
      currentImage: index,
      viewerIsOpen: true
    }));
  }

  closeViewer(): void {
    this.setState((prevState: GalleryState) => ({
      currentImage: 0,
      viewerIsOpen: false
    }));
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render(): React.ReactNode {
    return (
      <div>
        {this.state.viewerIsOpen ?
          <Carousel photos={photos}
                    index={this.state.currentImage}
                    onClose={this.closeViewer} />
        :
          <Gallery photos={photos}
                  direction={this.state.galleryDirection}
                  columns={1}
                  onClick={(event, {photo, index}) => this.openViewer(index)}
                  targetRowHeight={photoGalleryRowHeight}
                  margin={photoGalleryMargin} />
        }
      </div>
    );
  }
}

export const HomePageDefinitions: AnalyticsContentProps = {
  pageTitle: 'home',
  pagePath: '/'
}

export default withAnalytics(PhotoGallery, HomePageDefinitions);
