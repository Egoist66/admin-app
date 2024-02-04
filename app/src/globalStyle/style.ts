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
     #text-area-meta {
          border: 1px solid transparent;
          outline: 1px solid rgba(0, 0, 0, 0.23);
          padding: 16px;
          font-size: 1rem;
          font-family: 'Roboto';
     }

     #text-area-meta:hover {
          outline: 1px solid black;
     }

     #text-area-meta:focus-visible {
          outline: 2px solid #1565C0;
          border: 1px solid transparent;
     }

     #text-area-meta:focus {
          outline: 2px solid #1565C0;
          border: 1px solid transparent;
     }
     

`