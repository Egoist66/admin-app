import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useRef } from "react";
import { EditorView } from "./EditorView";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { delay } from '../../utils/delay'
import { clearMessage, createPages, deletePages, fetchPages, filesSelector } from "../../store/slice/pagelist-slice";
import "../../helpers/iframeLoader"
import { createTemplatePage, fetchSourceIndexData, indexSrcSelector, saveEdits } from "../../store/slice/source-slice";


type EditorStateType = {
     currentPage: string,
     iframe: HTMLIFrameElement | null
     virtualDom: Document | null
}

export const Editor: FC = () => {

     const options = useRef<EditorStateType>({
          currentPage: 'index.html',
          virtualDom: null,
          iframe: null
     })
     const { current: { currentPage } } = options
     const dispatch = useAppDispatch()


     const { files, status, message, statusCode } = useAppSelector(filesSelector)
     const { sourceData } = useAppSelector(indexSrcSelector)
     const inputRef = useRef<HTMLInputElement>(null)



     const open = (page: string) => {
          options.current.currentPage = page
          dispatch(fetchSourceIndexData(`../${page}?rnd=${Math.random()}`))

     }

     const save = () => {
          const newDom = options.current.virtualDom?.cloneNode(true)
          unwrapTextNodes(newDom!)
          const html = serializeDomToString(newDom!)


          dispatch(saveEdits({html, pagename: options.current.currentPage}))
          console.log(options.current.currentPage);
          


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

     const parseStringIntoDOM = (dom: string) => {
          const parser = new DOMParser()
          return parser.parseFromString(dom, "text/html");


     }

     const wrapTextNodes = (dom: Document) => {

          const body = dom.body as HTMLBodyElement
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




          textNodes.forEach((tnode, i: number) => {

               const wrapper = dom.createElement('text-editor') as HTMLElement
               tnode.parentNode?.replaceChild(wrapper, tnode)
               wrapper.appendChild(tnode)
               wrapper.textContent = tnode.textContent?.trim()!
               wrapper.setAttribute('node-id', String(i))
          })

          return dom
     }

     const unwrapTextNodes = (dom: Document | any) => {
          const customWrapper = dom.body.querySelectorAll('text-editor') as NodeList
          customWrapper.forEach(elem => {
               elem.parentNode?.replaceChild(elem.firstChild!, elem)
          })
     }

     const serializeDomToString = (dom: Document | Node) => {
          const serializer = new XMLSerializer()
          const stringDom = serializer.serializeToString(dom)


          return stringDom
     }

     const enableEditing = () => {
          options.current.iframe?.contentDocument?.body.querySelectorAll('text-editor').forEach(t => {
               if (t) {
                    t.setAttribute('contenteditable', 'true')
                    t.addEventListener('input', (e) => {

                         onTextEdit(t)

                    })
               }

          })

     }

     const onTextEdit = (element: Element) => {
          const id = element.getAttribute('node-id')
          const foundElem = options.current.virtualDom?.body.querySelector(`[node-id="${id}"]`)
          if (foundElem) {
               foundElem.innerHTML = element.innerHTML
               
          }

     }

     const initApp = () => {
          const dom = parseStringIntoDOM(sourceData!)
          const modifiedDom = wrapTextNodes(dom)
          options.current.virtualDom = modifiedDom

          dispatch(createTemplatePage(serializeDomToString(dom)))


          //@ts-ignore
          options.current.iframe.load('../temp.html', () => {
               enableEditing()
          })
     }

     // Side effects



     useEffect(() => {
          if (sourceData) initApp()

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
          statusCode,
          message,
          currentPage,
          createPage,
          deletePage,
          files
     }


     return (


          <>

               <button style={{
                    position: 'relative',
                    zIndex: 999999999999
               }} onClick={save}>Click</button>    
               <EditorView data={{ ...data }} />


          </>
     )
}