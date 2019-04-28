import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import reduxPromise from "redux-promise";
import PropTypes from "prop-types";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-111919356-4');
ReactGA.pageview(window.location.pathname + window.location.search);

export const Root = ({ children, initialState = {} }) => {
    const store = createStore(reducers, initialState, applyMiddleware(reduxPromise));
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

Root.propTypes = {
    children: PropTypes.element,
    initialState: PropTypes.object
};