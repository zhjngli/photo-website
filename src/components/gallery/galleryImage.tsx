import React, { CSSProperties, useEffect, useState } from 'react';
import FadeIn from 'react-fade-in';
import { PhotoProps, renderImageClickHandler, RenderImageProps } from 'react-photo-gallery';
import { NavLink } from 'react-router-dom';

import { ExtendedPhotoProps } from '../../photos';
import { getCarouselPagePath } from '../carousel';
import Image from '../image';
import style from './style.module.scss';

export default function GalleryImage(renderImageProps: RenderImageProps<ExtendedPhotoProps>): React.ReactElement {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // This is kind of hacky way to delay rendering of each gallery image, getting a cascading image load effect.
    // Ideally the timeout would be (index * 50) where 50 is the child delay that <FadeIn> sets. However due to the way
    // react-photo-gallery renders, there seem to be multiple pass throughs to determine the height/width properties,
    // before the final render. Through trial/error testing, this seems to be the best delay that allows creates the
    // desired cascading load effect.
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, renderImageProps.index * 2);
    return () => clearTimeout(timeout);
  });

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
  return isVisible ? (
    <FadeIn key={photo.src}>
      <div
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
    </FadeIn>
  ) : (
    <></>
  );
}
