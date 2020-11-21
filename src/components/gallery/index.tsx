import React from "react";
import Gallery from "react-photo-gallery";
import AnalyticsContent from '../analyticsContent';
import AnalyticsContentProps from '../analyticsContent/types';
// import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "./photos";
import variables from '../../theme/dimensions.module.scss';

type GalleryProps = {} & AnalyticsContentProps

type GalleryState = {
  currentImage: number,
  viewerIsOpen: boolean
}

class PhotoGallery extends React.Component<GalleryProps, GalleryState> {
  constructor(props: GalleryProps) {
    super(props);

    this.state = {
      currentImage: 0,
      viewerIsOpen: false
    };
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
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

  render() {
    return (
      <div>
        {/* use pageTitle 'home' when accessing it from within the website rather than a page load
            e.g. clicking into about page then back to home page */}
        <AnalyticsContent pagePath={this.props.pagePath} pageTitle={this.props.pageTitle} />
        <Gallery photos={photos}
                direction='row'
                // onClick={(event, {photo, index}) => this.openLightbox(index)}
                targetRowHeight={parseInt(variables.photoGalleryRowHeight)}
                margin={parseInt(variables.photoGalleryMargin)} />
        {/* <ModalGateway>
          {this.state.viewerIsOpen ? (
            <Modal onClose={this.closeLightbox}>
              <Carousel
                currentIndex={this.state.currentImage}
                views={photos.map(x => ({
                  ...x,
                  // srcset: x.srcSet,
                  source: x.src
                  // caption: x.title
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway> */}
      </div>
    );
  }
}

export default PhotoGallery;
