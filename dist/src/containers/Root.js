import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import App from './App';
import rootReducer from '../reducers/rootReducer';
import rootEpic from '../epics/rootEpic';
import { composeWithDevTools } from 'redux-devtools-extension';
var epicMiddleware = createEpicMiddleware();
var composeEnhancers = composeWithDevTools({
// Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
var store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(epicMiddleware)));
epicMiddleware.run(rootEpic);
var Root = function () { return (React.createElement(Provider, { store: store },
    React.createElement(App, null))); };
export default Root;
//# sourceMappingURL=Root.js.map