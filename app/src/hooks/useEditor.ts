import { FormEvent, RefObject, useCallback, useRef, useState } from "react";
import { useDom } from "./useDom";
import { adminAPI } from "../../api/service/admin-api";
import { EditorText } from "../helpers/editor-text";
import { useAdmin } from "./useAdmin";
import { useAppDispatch } from "../../store/store";
import { setEditing, Statuses } from '../../store/app-ui-action-slice';
import { delay } from "../utils/delay";

export type OptionsType = {
  currentPage: string,
  iframe: HTMLIFrameElement | null
  virtualDom: Document | null
}
type EditorViewType = {
  files: string[]

}

export const useEditor = () => {
  const dispatch = useAppDispatch()

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

  const save = async () => {
    const newDom = options.current.virtualDom?.cloneNode(true)
    unwrapTextNodes(newDom!)
    const html = serializeDomToString(newDom!)

    dispatch(setEditing({status: Statuses.LOADING}))
    await delay(1000)

    adminAPI.saveEdit(options.current.currentPage, html)
    .then(async (data) => {
      if(data.status === 0){
       
        dispatch(setEditing({status: Statuses.RESOLVED, statusCode: data.status, response: data.response}))

        await delay(3000)
        dispatch(setEditing({status: Statuses.IDLE, response: ''}))

      }
     
    })
    .catch((e: any) => {
      console.log(e);
      dispatch(setEditing({status: Statuses.ERROR, response: e.message}))

    })
    
    


  }


  const loadPages = () => {

    adminAPI.loadPageList()
      .then(pages => {

        setState((state) => ({ ...state, files: pages }))

      })
      .catch((e: any) => {

        console.log(e)

      })
  }

  const fetchSrc = (page: string) => {

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


              enableEditig(options.current.iframe?.contentDocument?.body!, options.current.virtualDom!)
              injectStyles(options.current.iframe)

            })
          })



      })
      .catch((e: any) => {
        console.log(e);


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
