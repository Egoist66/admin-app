import React from "react";
import { FC } from "react";
//@ts-ignore
import { useNetworkState } from "@uidotdev/usehooks";
export const AppOffline: FC = () => {

     const {online} = useNetworkState()


     return (
          <>



          </>
     )
}