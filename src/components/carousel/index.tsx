import React from 'react';
import { PhotoProps } from 'react-photo-gallery';

import { transitionTimeout } from '../../theme/dimensions';
import Image from '../image';
import style from './style.module.scss';

const ESCAPE_KEYS = ['Escape', 27];
const LEFT_ARROW_KEYS = ['ArrowLeft', 37];
const RIGHT_ARROW_KEYS = ['ArrowRight', 39];

type CarouselProps = {
  onClose: () => void;
  photos: Array<PhotoProps>;
  initialIndex: number;
};

type CarouselState = {
  index: number;
  lastNext: number;
  lastPrev: number;
};

class Carousel extends React.Component<CarouselProps, CarouselState> {
  numPhotos: number;

  constructor(props: CarouselProps) {
    super(props);

    this.numPhotos = this.props.photos.length;
    this.state = {
      index: this.props.initialIndex,
      lastNext: Date.now(),
      lastPrev: Date.now()
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleDivClick = this.handleDivClick.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
  }

  handleClose(): void {
    this.props.onClose();
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (ESCAPE_KEYS.includes(event.code)) {
      this.handleClose();
    } else if (LEFT_ARROW_KEYS.includes(event.code)) {
      this.prevImage();
    } else if (RIGHT_ARROW_KEYS.includes(event.code)) {
      this.nextImage();
    }
  }

  handleDivClick(event: MouseEvent): void {
    if (event.pageX <= window.innerWidth / 2) {
      this.prevImage();
    } else {
      this.nextImage();
    }
  }

  nextImage(): void {
    const now = Date.now();
    if (now - this.state.lastNext > transitionTimeout) {
      this.setState((prevState: CarouselState) => ({
        index: prevState.index + 1 >= this.numPhotos ? 0 : prevState.index + 1,
        lastNext: now
      }));
    }
  }

  prevImage(): void {
    const now = Date.now();
    if (now - this.state.lastPrev > transitionTimeout) {
      this.setState((prevState: CarouselState) => ({
        index: prevState.index - 1 < 0 ? this.numPhotos - 1 : prevState.index - 1,
        lastPrev: now
      }));
    }
  }

  componentDidMount(): void {
    window.addEventListener('keydown', this.handleKeyPress);
    document.getElementById('image')?.addEventListener('click', (event) => this.handleDivClick(event));
    document.getElementById('close')?.addEventListener('click', (_event) => this.handleClose());
    document.getElementById('prev')?.addEventListener('click', (_event) => this.prevImage());
    document.getElementById('next')?.addEventListener('click', (_event) => this.nextImage());
  }

  componentWillUnmount(): void {
    window.removeEventListener('keydown', this.handleKeyPress);
    document.getElementById('image')?.removeEventListener('click', (event) => this.handleDivClick(event));
    document.getElementById('close')?.removeEventListener('click', (_event) => this.handleClose());
    document.getElementById('prev')?.removeEventListener('click', (_event) => this.prevImage());
    document.getElementById('next')?.removeEventListener('click', (_event) => this.nextImage());
  }

  render(): React.ReactNode {
    return (
      <div className={style.container}>
        <div className={style.closeContainer}>
          <button className={style.button} id={'close'}>
            X
          </button>
        </div>
        <div className={style.imageContainer} id={'image'}>
          {this.props.photos.map((photo, i) => (
            <span className={i === this.state.index ? style.appear : style.disappear} key={photo.src}>
              <Image {...photo} pictureStyle={style.pictureWrapper} imageStyle={style.image} />
            </span>
          ))}
        </div>
        <div className={style.navContainer}>
          <button className={`${style.button} ${style.prev}`} id={'prev'}>
            {'<'}
          </button>
          <button className={`${style.button} ${style.next}`} id={'next'}>
            {'>'}
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
