import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Page from './page';

declare global {
  interface Window {
      dataLayer: any;
      gtag: any;
  }
}
window.dataLayer = window.dataLayer || [];
window.gtag = function () {
  window.dataLayer.push(arguments);
}
window.gtag('js', new Date());
window.gtag('config', 'G-R0M2056RBS');

ReactDOM.render(
  <Page />,
  document.querySelector('#root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();
