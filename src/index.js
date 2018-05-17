import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Test from './components';

ReactDOM.render(<div>
  <Router>
    <div>
      <Route path="/" component={Test} />
      <Route path="/hire" component={Test} />
      <Route path="/test" component={Test} />
    </div>
  </Router>
</div>, document.getElementById('index')); // eslint-disable-line
