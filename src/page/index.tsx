import React from "react";
import style from './style.module.scss';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';
import Carousel from "../components/carousel";
import PhotoGallery, { HomePageDefinitions } from '../components/gallery';
import { About, Contact, NotFound } from '../components/content';
import { AboutPageDefinitions } from "../components/content/about";
import { ContactPageDefinitions } from "../components/content/contact";
import { NotFoundPageDefinitions } from "../components/content/notfound";
import photos from './photos';

type PageState = {
  currentImage: number,
  viewerIsOpen: boolean,
}

class Page extends React.Component<{}, PageState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      currentImage: 0,
      viewerIsOpen: false,
    }
    this.openViewer = this.openViewer.bind(this);
    this.closeViewer = this.closeViewer.bind(this);
  }

  openViewer(index: number): void {
    this.setState((prevState: PageState) => ({
      currentImage: index,
      viewerIsOpen: true
    }));
  }

  closeViewer(): void {
    this.setState((prevState: PageState) => ({
      currentImage: 0,
      viewerIsOpen: false
    }));
  }

  renderHome() : React.ReactElement {
    return (
      <div className={style.unselectable}>
        {this.state.viewerIsOpen ?
          <Carousel photos={photos}
                    index={this.state.currentImage}
                    onClose={this.closeViewer} />
          :
          <PhotoGallery photos={photos}
                        openViewer={this.openViewer} />
        }
      </div>
    );
  }

  render(): React.ReactNode {
    return (
      <div className={style.container}>
        <BrowserRouter>
          <Header homeClick={this.closeViewer} />
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
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default Page;
