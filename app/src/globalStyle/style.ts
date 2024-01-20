import { createGlobalStyle } from "styled-components";


const panel_height: string = '64px';
export const GlobalStyle = createGlobalStyle`
  

     body,html {
          font-family: Arial,serif;
     }

     .file-name {
          display: flex;
          margin-bottom: 10px;
          gap: 10px;
     }

     .file-name:nth-child(1){
          margin-top: 10px;
     }

     iframe {
          position: absolute;
          width: 100%;
          height: calc(100vh - ${panel_height});
          left: 0;
          top: ${panel_height};
     }
     
     .panel {
       display: flex;
       justify-content: flex-end;
       padding: 12px;
       height: ${panel_height};
       border-bottom: 1px solid black;
     }
     

`