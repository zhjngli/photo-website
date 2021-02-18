import React, { CSSProperties } from 'react';
import FadeIn from 'react-fade-in';
import Gallery, { PhotoProps, renderImageClickHandler, RenderImageProps } from 'react-photo-gallery';
import { NavLink } from 'react-router-dom';

import photos, { ExtendedPhotoProps } from '../../photos';
import commonStyle from '../../theme/common.module.scss';
import { photoGalleryMargin, photoGalleryRowHeight, screenReactiveWidth } from '../../theme/dimensions';
import withAnalytics from '../analyticsContent';
import AnalyticsContentProps from '../analyticsContent/types';
import { getCarouselPagePath } from '../carousel';
import Image from '../image';
import style from './style.module.scss';

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

  renderImage(renderImageProps: RenderImageProps<ExtendedPhotoProps>): React.ReactElement {
    const photo: PhotoProps<ExtendedPhotoProps> = renderImageProps.photo;
    const clickHandler: renderImageClickHandler = renderImageProps.onClick ? renderImageProps.onClick : () => null;
    const defaultCss: CSSProperties = {
      margin: renderImageProps.margin,
      height: photo.height,
      width: photo.width
    };
    const directionalCss: CSSProperties =
      renderImageProps.direction === 'row'
        ? { position: 'relative' }
        : {
            position: 'absolute',
            left: renderImageProps.left,
            top: renderImageProps.top
          };
    return (
      <div
        key={photo.src}
        className={style.imageContainer}
        style={{ ...defaultCss, ...directionalCss }}
        onClick={(event) => clickHandler(event, { ...photo, index: renderImageProps.index })}
      >
        <NavLink to={getCarouselPagePath(renderImageProps.index)}>
          <Image {...photo} pictureStyle={style.image} imageStyle={style.image} />
          <div className={style.overlay}>
            <span className={style.overlayAlt}>{photo.alt}</span>
          </div>
        </NavLink>
      </div>
    );
  }

  render(): React.ReactNode {
    return (
      // look into implementing this fade by row (if gallery direction is row) or by image (if gallery direction is col)
      <main className={commonStyle.unselectable}>
        <FadeIn>
          <Gallery
            photos={photos}
            direction={this.state.galleryDirection}
            columns={1}
            renderImage={this.renderImage}
            targetRowHeight={photoGalleryRowHeight}
            margin={photoGalleryMargin}
          />
        </FadeIn>
      </main>
    );
  }
}

export const HomePageDefinitions: AnalyticsContentProps = {
  pageTitle: 'home',
  pagePath: '/'
};

export default withAnalytics(PhotoGallery, HomePageDefinitions);
