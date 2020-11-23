import React from "react";
import style from './style.module.scss';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { About, Contact, NotFound } from '../components/content';
import Footer from '../components/footer';
import Header from '../components/header';
import PhotoGallery from '../components/gallery';

const contentPages = {
  home: {
    pageTitle: 'home',
    pagePath: '/'
  },
  about: {
    pageTitle: 'about',
    pagePath: '/about'
  },
  contact: {
    pageTitle: 'contact',
    pagePath: '/contact'
  },
  notFound: {
    pageTitle: 'notfound',
    pagePath: '/notfound'
  },
}

class Page extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path={contentPages.home.pagePath}>
              <PhotoGallery {...contentPages.home} />
            </Route>
            <Route exact path={contentPages.about.pagePath}>
              <About {...contentPages.about} />
            </Route>
            <Route exact path={contentPages.contact.pagePath}>
              <Contact {...contentPages.contact} />
            </Route>
            <Route exact path={contentPages.notFound.pagePath}>
              <NotFound {...contentPages.notFound} />
            </Route>
            <Redirect to={contentPages.notFound.pagePath} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default Page;
