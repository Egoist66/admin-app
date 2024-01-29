import { FormEvent, RefObject, useCallback, useRef, useState } from "react";
import { useDom } from "./useDom";
import { adminAPI } from "../../api/service/admin-api";
import { EditorText } from "../helpers/editor-text";
import { useAdmin } from "./useAdmin";
import { Statuses, useCatchUI } from "./useCatchUI";

export type OptionsType = {
  currentPage: string,
  iframe: HTMLIFrameElement | null
  virtualDom: Document | null
}
type EditorViewType = {
  files: string[]

}

export const useEditor = () => {
  const options = useRef<OptionsType>({
    currentPage: '',
    virtualDom: null,
    iframe: null
  })

  const [state, setState] = useState<EditorViewType>({
    files: [],
    
    
  })


  const {
    unwrapTextNodes,
    wrapTextNodes,
    injectStyles,
    serializeDomToString,
    parseStringIntoDOM
  } = useDom()

  const {enableEditig} = useAdmin()
  const {onLoad, onError} = useCatchUI()

  const save = (afterSave: () => void) => {
    const newDom = options.current.virtualDom?.cloneNode(true)
    unwrapTextNodes(newDom!)
    const html = serializeDomToString(newDom!)

      onLoad(Statuses.LOADING, 0)

      adminAPI.saveEdit(options.current.currentPage, html)
      .then(data => {
        onLoad(Statuses.RESOLVED, data.status, data.response)

      })
      .then(afterSave)
      .catch((e: any) => {
        console.log(e);
        onError(Statuses.ERROR, true)
      })
    
    


  }


  const loadPages = () => {
    onLoad(Statuses.LOADING, 0, '')

    adminAPI.loadPageList()
      .then(pages => {

        setState((state) => ({ ...state, files: pages }))
        onLoad(Statuses.RESOLVED, 0, 'Файлы загружены')

      })
      .catch((e: any) => {

        console.log(e)
        onError(Statuses.ERROR, true)

      })
  }

  const fetchSrc = (page: string) => {
    onLoad(Statuses.LOADING, 0)

    adminAPI.loadSource(page)
      .then(data => parseStringIntoDOM(data))
      .then(wrapTextNodes)
      .then(dom => {
        options.current.virtualDom = dom
        return dom
      })
      .then(serializeDomToString)
      .then((html) => {
        adminAPI.saveTemplate(html)
          .then(data => data)
          .then((data) => {
            //@ts-ignore
            options?.current?.iframe?.load('../$randTmp-page01.html', () => {

              onLoad(Statuses.RESOLVED, data.status, 'Шаблон создан')

              enableEditig(options.current.iframe?.contentDocument?.body!, options.current.virtualDom!)
              injectStyles(options.current.iframe)

            })
          })



      })
      .catch((e: any) => {
        console.log(e);
        onError(Statuses.ERROR, true)


      })
  }



  const createPage = (e: FormEvent, newPage: string) => {
    e.preventDefault()

    adminAPI.createNewPage(newPage)
      .then(data => {
        setState((state) => ({
          ...state,
          files: data?.files?.length ? [...data.files] : [...state.files],
          
        }))
      })
      .catch((e) => {
        console.log(e);

      })
  }

  const deletePage = (page: string) => {
    adminAPI.deletePage(page)
      .then(data => {
        

      })
      .then(loadPages)
      .catch((e) => {
        console.log(e);

      })
  }

  return {
    options,
    deletePage,
    createPage,
    fetchSrc,
    loadPages,
    state,
    save,
  }
}
