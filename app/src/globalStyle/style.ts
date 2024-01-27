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

     .loader-custom {
          z-index: 999999999999999 !important;
     }

     iframe {
          position: absolute;
          width: 100%;
          height: calc(100vh - ${panel_height});
          left: 0;
          top: ${panel_height};
     }

     .ui.dimmer {
          background-color: #0067b4 !important;
     }

     div.modals.dimmer {
          background-color: #000000e0 !important;
     }
     
     .panel {
       display: flex;
       justify-content: flex-end;
       padding: 12px;
       height: ${panel_height};
       border-bottom: 1px solid black;
     }

     .page-item div {
          justify-content: space-between !important;
     }

     .ui.modal>.actions {
          border: none !important;
     }

     .progress {
          border-radius: 0px !important;
     }
     

`