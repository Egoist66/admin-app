import React, { FC } from "react";
import { Editor } from "../Editor/Editor";
import { AppOffline } from "../Features/AppOffine";


const AppView: FC = () => {

 
   return (
    
    <>
     
     <AppOffline />
     <Editor  />

     
    </>
    
   );
};

export default AppView;
