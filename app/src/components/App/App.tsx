import React, { FC, useEffect, useState } from "react";
import { Editor } from "../Editor/Editor";
import { Dimmer, Loader } from "semantic-ui-react";
import {appInitAction, appInitSelector } from "../../store/slice/app-init-slice";
import {useAppDispatch, useAppSelector } from "../../store/store";
import { AppOffline } from "../Features/AppOffine";




export const App: FC = () => {
     const { status} = useAppSelector(appInitSelector)
     const dispatch = useAppDispatch()
     const [state, setState] = useState<{message: string}>({
          message: ''
     })

     useEffect(() => {
          dispatch(appInitAction({status: 'initializing'}))

     }, [])
   

     useEffect(() => {
          switch(status){
               case "initializing": {
                    setState({message: 'Инициализация...'})
                    break
               }

               case "settled": {
                    setState({message: 'Загружено'})
                    break

               }

               case "idle": {
                    setState({message: ''})
                    break
               }

               default: {
                    setState({message: 'Ошибка загрузки'})

               }

          
          }
     }, [status])

     return (
          <>
               <AppOffline />
               {status !== 'idle' ? <Dimmer active>
                    <Loader content={state.message}  size='massive'/>
               </Dimmer>: null}

               <Editor />
          
          </>
     )
     
}