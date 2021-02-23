import React from 'react';
import { PhotoProps } from 'react-photo-gallery';

import { ExtendedPhotoProps } from '../../photos';

type StyledImageProps = PhotoProps<ExtendedPhotoProps> & { pictureStyle: string; imageStyle: string };

class Image extends React.Component<StyledImageProps> {
  render(): React.ReactNode {
    return (
      <picture className={this.props.pictureStyle}>
        <source srcSet={this.props.webpSrc} type="image/webp" />
        <source srcSet={this.props.src} type="image/jpeg" />
        <img loading="lazy" src={this.props.src} className={this.props.imageStyle} alt={this.props.alt} />
      </picture>
    );
  }
}

export default Image;
