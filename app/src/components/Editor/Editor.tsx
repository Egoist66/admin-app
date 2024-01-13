import React, { FC, FormEvent, useCallback, useEffect, useRef } from "react";
import { EditorView } from "./EditorView";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { delay } from '../../utils/delay'
import { clearMessage, createPages, deletePages, fetchPages, filesSelector } from "../../store/slice/pagelist-slice";
import "../../helpers/iframeLoader"


type EditorStateType = {
     currentPage: string,
     iframe: HTMLIFrameElement | null
}

export const Editor: FC = () => {

     const options = useRef<EditorStateType>({
          currentPage: 'index.html',
          iframe: null
     })
     const { current: { currentPage, iframe } } = options

     const dispatch = useAppDispatch()
     const { files, status, message, statusCode } = useAppSelector(filesSelector)
     const inputRef = useRef<HTMLInputElement>(null)



     const open = (page: string) => {
          options.current.currentPage = `../${page}`

          //@ts-ignore
          options.current.iframe.load(currentPage, () => {

               const body = options.current.iframe?.contentDocument?.body as HTMLBodyElement
               const textNodes: ChildNode[] = []

               function recurMatchNodes(element: HTMLBodyElement | ChildNode) {
                    element?.childNodes.forEach(node => {
                         if (node.nodeName === '#text' && node.nodeValue!.replace(/\s+/g, '').length > 0) {
                              textNodes?.push(node)
                              return
                         }
                         else {
                              recurMatchNodes(node)

                         }




                    })
               }


               recurMatchNodes(body)




               textNodes.forEach(tnode => {

                    const wrapper = options.current.iframe?.contentDocument!.createElement('text-editor') as HTMLElement
                    tnode.parentNode?.replaceChild(wrapper, tnode)
                    wrapper.appendChild(tnode)
                    wrapper.textContent = tnode.textContent?.trim()!
                    wrapper.contentEditable = "true"
               })


          })




     }

     const init = (page: string) => {
          const iframe = document.querySelector('iframe') as HTMLIFrameElement
          options.current.iframe = iframe ? iframe : null
          open(page)



          dispatch(fetchPages())


     }



     const createPage = useCallback((e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          if (inputRef.current) {
               if (inputRef.current.value === '') {
                    return
               }
          }

          const formData = new FormData(e.currentTarget)
          dispatch(createPages(formData))
     }, [])

     const deletePage = useCallback((page: string) => {
          dispatch(deletePages(page))

     }, [files.length])




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
          statusCode,
          message,
          currentPage,
          createPage,
          deletePage,
          files
     }


     return (


          <EditorView data={{ ...data }} />
     )
}