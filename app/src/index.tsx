import React from "react";
import {createRoot} from "react-dom/client";
import styled from "styled-components";

const App = styled.div`
 width: 500px;
 background: red; 

`

const root = createRoot(document.getElementById('root')!)
root.render(
    <App>Hello wor</App>
)