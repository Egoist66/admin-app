import {createRoot} from "react-dom/client";
import {App} from "./components/App/App";
import React from "react";
import {GlobalStyle} from "./globalStyle/style";
import '../../node_modules/uikit/dist/css/uikit.min.css'

const root = createRoot(document.getElementById('root')!)
root.render(

        <>
        
            <GlobalStyle/>
            <App/>

        
        </>

)