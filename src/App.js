// App.js

import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
				<Sidebar />
				<Content />
      </div>
    );
  }
}

export default App;
