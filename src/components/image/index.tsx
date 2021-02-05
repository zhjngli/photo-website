import React from 'react';
import { PhotoProps } from 'react-photo-gallery';
import { ExtendedPhotoProps } from '../../page/photos';

type StyledImageProps = PhotoProps<ExtendedPhotoProps> & { style: string };

class Image extends React.Component<StyledImageProps> {
  render(): React.ReactNode {
    return (
      <picture className={this.props.style}>
        <source srcSet={this.props.webpSrc} type="image/webp" />
        <source srcSet={this.props.src} type="image/jpeg" />
        <img loading="lazy" src={this.props.src} className={this.props.style} />
      </picture>
    );
  }
}

export default Image;
