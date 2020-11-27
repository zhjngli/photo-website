import React from "react";
import Gallery from "react-photo-gallery";
import withAnalytics from '../analyticsContent';
import { photos } from "./photos";
import {screenReactiveWidth, photoGalleryMargin, photoGalleryRowHeight} from '../../theme/dimensions';
import Carousel from "../carousel";

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
      galleryDirection: 'row'
    };
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
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

  openLightbox(index: number): void {
    this.setState((prevState: GalleryState) => ({
      currentImage: index,
      viewerIsOpen: true
    }));
  }

  closeLightbox(): void {
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
                    onClose={this.closeLightbox} />
        :
          <Gallery photos={photos}
                  direction={this.state.galleryDirection}
                  columns={1}
                  onClick={(event, {photo, index}) => this.openLightbox(index)}
                  targetRowHeight={photoGalleryRowHeight}
                  margin={photoGalleryMargin} />
        }
      </div>
    );
  }
}

export default withAnalytics(PhotoGallery);
