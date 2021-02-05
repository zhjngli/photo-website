import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Footer from '../components/footer';
import Header from '../components/header';

const PhotoGallery = lazy(() => import('../components/gallery'));
const Carousel = lazy(() => import('../components/carousel'));
const About = lazy(() => import('../components/content/about'));
const Contact = lazy(() => import('../components/content/contact'));
const NotFound = lazy(() => import('../components/content/notfound'));
import { AboutPageDefinitions } from '../components/content/about';
import { ContactPageDefinitions } from '../components/content/contact';
import { NotFoundPageDefinitions } from '../components/content/notfound';
import { HomePageDefinitions } from '../components/gallery';
import photos from './photos';
import style from './style.module.scss';

type PageState = {
  gallerySelectedImageIndex: number;
  viewerIsOpen: boolean;
};

class Page extends React.Component<Record<string, never>, PageState> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      gallerySelectedImageIndex: 0,
      viewerIsOpen: false
    };
    this.openViewer = this.openViewer.bind(this);
    this.closeViewer = this.closeViewer.bind(this);
  }

  openViewer(index: number): void {
    this.setState((_prevState: PageState) => ({
      gallerySelectedImageIndex: index,
      viewerIsOpen: true
    }));
  }

  closeViewer(): void {
    this.setState((_prevState: PageState) => ({
      gallerySelectedImageIndex: 0,
      viewerIsOpen: false
    }));
  }

  renderHome(): React.ReactElement {
    return (
      <main className={style.unselectable}>
        {this.state.viewerIsOpen ? (
          <Carousel photos={photos} initialIndex={this.state.gallerySelectedImageIndex} onClose={this.closeViewer} />
        ) : (
          <PhotoGallery photos={photos} openViewer={this.openViewer} />
        )}
      </main>
    );
  }

  render(): React.ReactNode {
    return (
      <div className={style.container}>
        <BrowserRouter>
          <Header homeClick={this.closeViewer} />
          <Suspense fallback={<div></div>}>
            <Switch>
              <Route exact path={HomePageDefinitions.pagePath}>
                {this.renderHome()}
              </Route>
              <Route exact path={AboutPageDefinitions.pagePath}>
                <About />
              </Route>
              <Route exact path={ContactPageDefinitions.pagePath}>
                <Contact />
              </Route>
              <Route exact path={NotFoundPageDefinitions.pagePath}>
                <NotFound />
              </Route>
              <Redirect to={NotFoundPageDefinitions.pagePath} />
            </Switch>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default Page;
