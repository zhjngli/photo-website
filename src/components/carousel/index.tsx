import React from 'react';
import { PhotoProps } from 'react-photo-gallery';
import CarouselImage from './carouselImage';
import style from './style.module.scss';

const ESCAPE_KEYS = ["Escape", 27];
const LEFT_ARROW_KEYS = ["ArrowLeft", 37];
const RIGHT_ARROW_KEYS = ["ArrowRight", 39];

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
    }
    else if (LEFT_ARROW_KEYS.includes(event.code)) {
      this.prevImage();
    }
    else if (RIGHT_ARROW_KEYS.includes(event.code)) {
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
    window.addEventListener('keydown', this.handleKeyPress);
    document.getElementById('image')?.addEventListener('click', (event) => this.handleDivClick(event));
    document.getElementById('close')?.addEventListener('click', (event) => this.handleClose());
    document.getElementById('prev')?.addEventListener('click', (event) => this.prevImage());
    document.getElementById('next')?.addEventListener('click', (event) => this.nextImage());
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
    document.getElementById('image')?.removeEventListener('click', (event) => this.handleDivClick(event));
    document.getElementById('close')?.removeEventListener('click', (event) => this.handleClose());
    document.getElementById('prev')?.removeEventListener('click', (event) => this.prevImage());
    document.getElementById('next')?.removeEventListener('click', (event) => this.nextImage());
  }

  render(): React.ReactNode {
    return (
      <div className={style.container}>
        <div className={style.closeContainer}>
          <button className={style.button} id={'close'}>X</button>
        </div>
        <div className={style.imageContainer} id={'image'}>
          <CarouselImage {...this.props.photos[this.state.index]} />
        </div>
        <div className={style.navContainer}>
          <button className={`${style.button} ${style.prev}`} id={'prev'}>{"<"}</button>
          <button className={`${style.button} ${style.next}`} id={'next'}>{">"}</button>
        </div>
      </div>
    );
  }
}

export default Carousel;
