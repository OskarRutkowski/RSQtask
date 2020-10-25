import React from 'react';
import logo from './logo.svg';
import './App.css';
import Brick from './components/brick';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from './screens/game';
import Intro from './screens/intro';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Intro} />
          <Route path="/:level" exact component={Game} />
        </Switch>
      </Router>
    );
  }
}

export default App;
