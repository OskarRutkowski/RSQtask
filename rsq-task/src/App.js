import React from 'react';
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
