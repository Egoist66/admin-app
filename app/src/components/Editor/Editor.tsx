import { FC, useEffect } from "react";
import { EditorView } from './EditorView';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { delay } from '../../utils/delay'
import { clearMessage, fetchPages, filesSelector } from "../../store/slice/pagelist-slice";
import "../../helpers/iframeLoader"
import { createTemplatePage, fetchSourceIndexData, indexSrcSelector } from "../../store/slice/source-slice";
import { useDom } from "../../hooks/useDom";
import { usePages } from "../../hooks/usePages";
import { useAdmin } from "../../hooks/useAdmin";
import { appInitAction } from "../../store/slice/app-init-slice";
import React from "react";

export const Editor: FC = () => {
     const dispatch = useAppDispatch()

     const { serializeDomToString, parseStringIntoDOM, wrapTextNodes, injectStyles } = useDom()
     const { options, inputRef, createPage, deletePage, save } = usePages(dispatch)
     const { enableEditing } = useAdmin(options)


     const { current: { currentPage } } = options
     const { files, status, message, statusCode } = useAppSelector(filesSelector)
     const { sourceData, saveStatus, savedMessage } = useAppSelector(indexSrcSelector)



     const open = (page: string) => {
          options.current.currentPage = page
          dispatch(fetchSourceIndexData(`../${page}?rnd=${Math.random()}`))

     }

     const init = (page: string) => {
          const iframe = document.querySelector('iframe') as HTMLIFrameElement
          options.current.iframe = iframe ? iframe : null
          open(page)

          dispatch(fetchPages())


     }
     const initEditor = async () => {
          const dom = parseStringIntoDOM(sourceData!)
          options.current.virtualDom = wrapTextNodes(dom)

          dispatch(createTemplatePage(serializeDomToString(dom)))
     

          try {

               //@ts-ignore

               options.current.iframe.load('../temp.html', () => {
                    enableEditing()
                    injectStyles(options.current.iframe)


               })


          }
          catch (e) {
               console.log(e)
          }
     }




     // Side effects

    
     useEffect(() => {

          if (sourceData){

               initEditor()

               delay(1000).then(() => {
                    dispatch(appInitAction({ status: 'settled' }))

               })
               .then(() => {
                    delay(500).then(() => {
                         dispatch(appInitAction({status: 'idle'}))
                    })
               })
             


          }

     }, [sourceData])

     useEffect(() => {
          init(options.current.currentPage)
     }, [])

     useEffect(() => {
          if (message) {
               delay(2000).then(() => {
                    dispatch(clearMessage())
               })
          }
     }, [message])

     const data = {
          status,
          inputRef,
          save,
          statusCode,
          message,
          currentPage,
          createPage,
          saveStatus,
          savedMessage,
          deletePage,
          files
     }



     return (


          <>
              
               
               <EditorView data={{...data}} />

          </>
     )



}