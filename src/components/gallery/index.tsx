import React, { CSSProperties } from "react";
import Gallery, { PhotoProps, renderImageClickHandler, RenderImageProps } from "react-photo-gallery";
import withAnalytics from '../analyticsContent';
import {screenReactiveWidth, photoGalleryMargin, photoGalleryRowHeight} from '../../theme/dimensions';
import AnalyticsContentProps from "../analyticsContent/types";
import style from './style.module.scss';

type GalleryProps = {
  openViewer: (index: number) => void,
  photos: Array<PhotoProps>,
}

type GalleryState = {
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
      galleryDirection: window.innerWidth <= screenReactiveWidth ? GalleryDirection.Col : GalleryDirection.Row
    };
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
      <Gallery photos={this.props.photos}
              direction={this.state.galleryDirection}
              columns={1}
              onClick={(event, {photo, index}) => this.props.openViewer(index)}
              renderImage={this.renderImage}
              targetRowHeight={photoGalleryRowHeight}
              margin={photoGalleryMargin} />
    );
  }
}

export const HomePageDefinitions: AnalyticsContentProps = {
  pageTitle: 'home',
  pagePath: '/'
}

export default withAnalytics(PhotoGallery, HomePageDefinitions);
