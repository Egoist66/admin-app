import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

     body,html {
          font-family: Arial;
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
          height: 100%;
          left: 0;
          top: 0;
     }

`