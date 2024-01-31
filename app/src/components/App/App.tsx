import React, { FC } from "react";
import { EditorView } from "../Editor/EditorView";
import { AppOffline } from "../Features/AppOffine";


const AppView: FC = () => {

 
   return (
    
     <>
     
     <AppOffline />
     <EditorView  />

     
     </>
    
   );
};

export default AppView;
