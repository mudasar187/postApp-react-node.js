import React, { Component } from 'react';

import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import Landing from '../components/layout/Landing';

import './../styles/App.css';

class App extends Component {
    render() {
      return (
        <div className="App">
          <NavBar />
          <Landing />
          <Footer />
        </div>
      );
    }
}

export default App;