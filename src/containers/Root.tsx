import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import App from './App';
import rootReducer from '../reducers/rootReducer';
import rootEpic from '../epics/rootEpic';
import { composeWithDevTools } from 'redux-devtools-extension';

const epicMiddleware = createEpicMiddleware<any, any, any, any>();
const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export interface RootProps {
}

const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(epicMiddleware)));
epicMiddleware.run(rootEpic);
const Root = () => (<Provider store={store}>
    <App />
</Provider>);

export default Root;