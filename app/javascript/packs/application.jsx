import React from 'react';
import { render } from 'react-dom';
import App from '../components/App';
import 'semantic-ui-css/semantic.min.css';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <App />,
    document.querySelector('#root'),
  );
});
