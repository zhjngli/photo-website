import React from 'react';
import { PhotoProps } from 'react-photo-gallery';
import style from './style.module.scss';

class CarouselImage extends React.Component<PhotoProps> {
  render(): React.ReactNode {
    return <img className={style.carousel} src={this.props.src} />;
  }
}

export default CarouselImage;
