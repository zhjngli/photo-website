import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import photos from '../../photos';
import { transitionTimeout } from '../../theme/dimensions';
import AnalyticsContentProps from '../analyticsContent/types';
import { HomePageDefinitions } from '../gallery';
import Image from '../image';
import style from './style.module.scss';

const ESCAPE_KEYS = ['Escape', 27];
const LEFT_ARROW_KEYS = ['ArrowLeft', 37];
const RIGHT_ARROW_KEYS = ['ArrowRight', 39];

type CarouselProps = RouteComponentProps<{ index: string }>;

class Carousel extends React.Component<CarouselProps> {
  loadTime: number;
  numPhotos: number;

  constructor(props: CarouselProps) {
    super(props);

    this.loadTime = Date.now();
    this.numPhotos = photos.length;
    this.handleClose = this.handleClose.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleDivClick = this.handleDivClick.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
  }

  handleClose(): void {
    this.props.history.push(HomePageDefinitions.pagePath);
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
    if (now - this.loadTime > transitionTimeout) {
      const curr = +this.props.match.params.index;
      const next = curr + 1 >= this.numPhotos ? 0 : curr + 1;
      this.props.history.replace(getCarouselPagePath(next));
    }
  }

  prevImage(): void {
    const now = Date.now();
    if (now - this.loadTime > transitionTimeout) {
      const curr = +this.props.match.params.index;
      const prev = curr - 1 < 0 ? this.numPhotos - 1 : curr - 1;
      this.props.history.replace(getCarouselPagePath(prev));
    }
  }

  logAnalytics(): void {
    // custom analytics for carousel
    // console.log("location: ", window.location.href);
    // console.log("gtagging from: ", CarouselPageDefinitions.pageTitle, getCarouselPagePath(+this.props.match.params.index));
    window.gtag('config', 'G-R0M2056RBS', {
      page_title: CarouselPageDefinitions.pageTitle,
      page_path: getCarouselPagePath(+this.props.match.params.index)
    });
  }

  componentDidUpdate(): void {
    this.loadTime = Date.now();
    this.logAnalytics();
  }

  componentDidMount(): void {
    window.addEventListener('keydown', this.handleKeyPress);
    document.getElementById('image')?.addEventListener('click', (event) => this.handleDivClick(event));
    document.getElementById('close')?.addEventListener('click', (_event) => this.handleClose());
    document.getElementById('prev')?.addEventListener('click', (_event) => this.prevImage());
    document.getElementById('next')?.addEventListener('click', (_event) => this.nextImage());
    this.logAnalytics();
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
          {photos.map((photo, i) => (
            <span className={i === +this.props.match.params.index ? style.appear : style.disappear} key={photo.src}>
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

export function getCarouselPagePath(index: number): string {
  return CarouselPageDefinitions.pagePath.replace(/:index/g, index.toString());
}

export const CarouselPageDefinitions: AnalyticsContentProps = {
  pageTitle: 'carousel',
  pagePath: '/i/:index'
};

// Carousel has custom analytics logic
export default Carousel;
