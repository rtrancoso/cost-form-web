import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Routes from './routes';

import './assets/styles/index.scss';

function App() {
    return (
        <Router history={createBrowserHistory()}>
            <Routes />
        </Router>
    );
}

export default App;