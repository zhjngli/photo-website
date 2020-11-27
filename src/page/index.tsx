import React from "react";
import style from './style.module.scss';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { About, Contact, NotFound } from '../components/content';
import Footer from '../components/footer';
import Header from '../components/header';
import PhotoGallery, { HomePageDefinitions } from '../components/gallery';
import { AboutPageDefinitions } from "../components/content/about";
import { ContactPageDefinitions } from "../components/content/contact";
import { NotFoundPageDefinitions } from "../components/content/notfound";


class Page extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path={HomePageDefinitions.pagePath}>
              <PhotoGallery {...HomePageDefinitions} />
            </Route>
            <Route exact path={AboutPageDefinitions.pagePath}>
              <About {...AboutPageDefinitions} />
            </Route>
            <Route exact path={ContactPageDefinitions.pagePath}>
              <Contact {...ContactPageDefinitions} />
            </Route>
            <Route exact path={NotFoundPageDefinitions.pagePath}>
              <NotFound {...NotFoundPageDefinitions} />
            </Route>
            <Redirect to={NotFoundPageDefinitions.pagePath} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default Page;
