import {createRoot} from "react-dom/client";
import {App} from "./components/App/App";
import React from "react";
import {GlobalStyle} from "./globalStyle/style";
import {Provider} from "react-redux";
import {store} from "./store/store";
import 'semantic-ui-css/semantic.min.css'

const root = createRoot(document.getElementById('root')!)
root.render(
    <Provider store={store}>

        <GlobalStyle/>
        <App/>


    </Provider>
)