import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Footer from '../components/footer';
import Header from '../components/header';

const PhotoGallery = lazy(() => import('../components/gallery'));
const Carousel = lazy(() => import('../components/carousel'));
const About = lazy(() => import('../components/content/about'));
const Contact = lazy(() => import('../components/content/contact'));
const NotFound = lazy(() => import('../components/content/notfound'));
import { CarouselPageDefinitions } from '../components/carousel';
import { AboutPageDefinitions } from '../components/content/about';
import { ContactPageDefinitions } from '../components/content/contact';
import { NotFoundPageDefinitions } from '../components/content/notfound';
import { HomePageDefinitions } from '../components/gallery';
import style from './style.module.scss';

class Page extends React.Component<Record<string, never>> {
  render(): React.ReactNode {
    return (
      <div className={style.container}>
        <BrowserRouter>
          <Header />
          <Suspense fallback={<div></div>}>
            <Switch>
              <Route exact path={HomePageDefinitions.pagePath} component={PhotoGallery} />
              <Route exact path={CarouselPageDefinitions.pagePath} component={Carousel} />
              <Route exact path={AboutPageDefinitions.pagePath} component={About} />
              <Route exact path={ContactPageDefinitions.pagePath} component={Contact} />
              <Route exact path={NotFoundPageDefinitions.pagePath} component={NotFound} />
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
