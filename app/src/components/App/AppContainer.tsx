import React, { FC, Suspense, lazy } from "react";


//@ts-ignore
const App = lazy(() => import("./App.tsx"));

export const AppContainer: FC = () => {


  return (

    <>
    
       <Suspense>
            <App />
       </Suspense>
    
    
    </>
    
  );
};
