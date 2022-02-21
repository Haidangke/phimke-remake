import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import ScrollToTop from 'components/ScrollToTop';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <ScrollToTop />
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
