import * as React from "react";
import * as ReactDOM from "react-dom";

import {App} from './App';

window.onload = function() {
    ReactDOM.render(
        <App />,
        document.getElementById("wrapper")
    );
};