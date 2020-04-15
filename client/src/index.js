import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppComponent } from './app.component';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === 'development') {
    window.API_BASE_URL = 'http://localhost:4999/api/';
} else {
    window.API_BASE_URL = '/api/';
}

ReactDOM.render(<AppComponent/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
