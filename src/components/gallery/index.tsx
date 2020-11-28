import React, { CSSProperties } from "react";
import Gallery, { PhotoProps, renderImageClickHandler, RenderImageProps } from "react-photo-gallery";
import withAnalytics from '../analyticsContent';
import { photos } from "./photos";
import {screenReactiveWidth, photoGalleryMargin, photoGalleryRowHeight} from '../../theme/dimensions';
import Carousel from "../carousel";
import AnalyticsContentProps from "../analyticsContent/types";
import style from './style.module.scss';

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

  renderImage(renderImageProps: RenderImageProps): React.ReactElement {
    const photo: PhotoProps = renderImageProps.photo;
    const clickHandler: renderImageClickHandler = renderImageProps.onClick ? renderImageProps.onClick : () => null;
    const defaultCss: CSSProperties = {
      margin: renderImageProps.margin,
      height: photo.height,
      width: photo.width,
    }
    const directionalCss: CSSProperties = renderImageProps.direction === "row" ?
        { position: "relative" }
        :
        {
          position: "absolute",
          left: renderImageProps.left,
          top: renderImageProps.top,
        };
    return (
      <div
        className={style.imageContainer}
        style={{...defaultCss, ...directionalCss}}
        onClick={event => clickHandler(event, {...photo, index: renderImageProps.index})}
      >
        <img src={photo.src} className={style.image} />
        <div className={style.overlay}>
          <span className={style.overlayAlt}>{photo.alt}</span>
        </div>
      </div>
    );
  }

  render(): React.ReactNode {
    return (
      <div className={style.unselectable}>
        {this.state.viewerIsOpen ?
          <Carousel photos={photos}
                    index={this.state.currentImage}
                    onClose={this.closeViewer} />
        :
          <Gallery photos={photos}
                  direction={this.state.galleryDirection}
                  columns={1}
                  onClick={(event, {photo, index}) => this.openViewer(index)}
                  renderImage={this.renderImage}
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
