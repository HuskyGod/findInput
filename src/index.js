import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import mockInit from './mock'

mockInit();

ReactDOM.render(<App />, document.getElementById('root'));