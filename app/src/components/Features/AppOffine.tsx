import React from "react";
import { FC } from "react";
//@ts-ignore
import { useNetworkState } from "@uidotdev/usehooks";
import { Notification } from "./Notification";


export const AppOffline: FC = () => {

     const {online} = useNetworkState()


     return (
          <>

               <Notification 
                    variant="filled"
                    type={!online ? 'error': 'success'}
                    message={online ? 'Соединение восстановлено' : 'Отсутствие интернет соединения'} 
                    status={!online} 
               
               />

          </>
     )
}