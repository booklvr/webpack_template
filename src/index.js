import logMessage from './js/logger';
import './css/style.css';
import './sass/main.scss';

// log message to console
logMessage('Welcome to Webpack Boiler Template');

// needed for hot module replacement
if(typeof(module.hot) !== 'undefined') {
    module.hot.accept() // eslint-disbale-line no-undef
}

// https://medium.com/@binyamin/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334