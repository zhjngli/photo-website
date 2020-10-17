import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from '@material-ui/core';
import MyGallery from './components/gallery';
import MyHeader from './components/header';

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <MyHeader />
        <MyGallery />
      </Container>
    </div>
  );
}

export default App;
