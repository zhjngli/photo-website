import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { Container, Fade } from '@material-ui/core';
import About from './components/about';
import Footer from './components/footer';
import Header from './components/header';
import MyGallery from './components/gallery';
import Contact from './components/contact';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
      <BrowserRouter>
        <Container maxWidth={false} >
          <Header />
          <Fade>
            <Switch>
              <Route exact path="/" component={MyGallery} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
            </Switch>
          </Fade>
          <Footer />
        </Container>
      </BrowserRouter>
  </ThemeProvider>,
  document.querySelector('#root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();
