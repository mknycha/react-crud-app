import React from 'react';
import { render } from 'react-dom';
import App from '../components/App';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Router>
      <Route path='/posts'
             render={props => <App {...props} />}
             />
    </Router>,
    document.querySelector('#root'),
  );
});
