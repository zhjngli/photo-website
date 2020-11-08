import React from "react";
import style from './style.module.scss';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Fade } from '@material-ui/core';
import { About, Contact, NotFound } from '../components/content';
import Footer from '../components/footer';
import Header from '../components/header';
import PhotoGallery from '../components/gallery';

class Page extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className={style.container}>
          <Header />
          <Fade>
            <Switch>
              <Route exact path="/" component={PhotoGallery} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/notfound" component={NotFound} />
              <Redirect to="/notfound" />
            </Switch>
          </Fade>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default Page;
