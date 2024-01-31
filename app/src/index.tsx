import {createRoot} from "react-dom/client";
import React from "react";
import {GlobalStyle} from "./globalStyle/style";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { AppContainer } from "./components/App/AppContainer";

const root = createRoot(document.getElementById('root')!)
root.render(

        <Provider store={store}>
        
            <GlobalStyle/>
            <AppContainer />

        
        </Provider>

)