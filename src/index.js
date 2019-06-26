import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import mockInit from './mock'

import "./asstes/css/init.css"
import 'antd/dist/antd.css'; 

mockInit(true);

ReactDOM.render(<App />, document.getElementById('root'));