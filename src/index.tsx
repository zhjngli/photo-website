import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Page from './page';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    dataLayer: any;
    gtag: any;
  }
}
window.dataLayer = window.dataLayer || [];
window.gtag = function (...args: any) {
  window.dataLayer.push(args);
};
window.gtag('js', new Date());
window.gtag('config', 'G-R0M2056RBS');
/* eslint-enable @typescript-eslint/no-explicit-any */

ReactDOM.render(<Page />, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();
