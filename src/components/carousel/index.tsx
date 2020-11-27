import React from 'react';
import { PhotoProps } from 'react-photo-gallery';
import CarouselImage from './carouselImage';
import style from './style.module.scss';

const ESCAPE_KEYS = [27, "Escape"];

type CarouselProps = {
  onClose: () => void,
  photos: Array<PhotoProps>,
  index: number,
}

type CarouselState = {
  index: number,
}

class Carousel extends React.Component<CarouselProps, CarouselState> {
  numPhotos;

  constructor(props: CarouselProps) {
    super(props);

    this.numPhotos = this.props.photos.length;
    this.state = {
      index: this.props.index,
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
  }

  handleClose(): void {
    this.props.onClose();
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (ESCAPE_KEYS.includes(event.code)) {
      this.handleClose();
    }
  }

  nextImage(): void {
    this.setState((prevState: CarouselState) => ({
      index: prevState.index + 1 >= this.numPhotos ? 0 : prevState.index + 1
    }));
  }

  prevImage(): void {
    this.setState((prevState: CarouselState) => ({
      index: prevState.index - 1 <= 0 ? this.numPhotos - 1 : prevState.index - 1
    }));
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyPress);
  }

  render(): React.ReactNode {
    return (
      <div className={style.container}>
        <div className={style.closeContainer}>
          <button className={`${style.button} ${style.close}`} onClick={this.handleClose}>X</button>
        </div>
        <div className={style.imageContainer}>
          <CarouselImage {...this.props.photos[this.state.index]} />
        </div>
        <div className={style.navContainer}>
          <button className={`${style.button} ${style.prev}`} onClick={this.prevImage}>{"<"}</button>
          <button className={`${style.button} ${style.next}`} onClick={this.nextImage}>{">"}</button>
        </div>
      </div>
    );
  }
}

export default Carousel;
