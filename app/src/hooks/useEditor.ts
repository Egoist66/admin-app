import { FormEvent, RefObject, useCallback, useRef, useState } from "react";
import { useDom } from "./useDom";
import { adminAPI } from "../../api/service/admin-api";
import { useAdmin } from "./useAdmin";
import { useAppDispatch } from "../../store/store";
import { setApp, setBackup, setEditing, Statuses } from '../../store/app-ui-action-slice';
import { delay } from "../utils/delay";

export type OptionsType = {
  iframe: HTMLIFrameElement | null
  virtualDom: Document | null
}
type EditorViewType = {
  files: string[]
  currenPage: string
  backups: Array<{page: string, backup: string, backup_time: string}>

}

export const useEditor = () => {
  const dispatch = useAppDispatch()

  const options = useRef<OptionsType>({
    virtualDom: null,
    iframe: null
  })

  const [state, setState] = useState<EditorViewType>({
    files: [],
    backups: [],
    currenPage: "index.html"
    
    
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

    adminAPI.saveEdit(state.currenPage, html)
    .then(async (data) => {
      if(data.status === 0){
       
        dispatch(
          setEditing({
          status: Statuses.RESOLVED, 
          statusCode: data.status, 
          response: data.response
        }))

        loadBackups()

        await delay(3000)
        dispatch(setEditing({status: Statuses.IDLE, response: ''}))

      }
      else {
        
        dispatch(setEditing({
          status: Statuses.ERROR, 
          response: data.response, 
          statusCode: data.status
        }))

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

  const loadBackups = () => {
    adminAPI.loadBackupList('./backup/backups.json')
      .then(backups => {
        setState((state) => ({
          ...state,
          backups: backups.filter(b => b.page === state.currenPage)
        }))

      })
      .catch((e: any) => {

        console.log(e)

      })
  }

  const restoreBackup = async (backup: string) => {
    const isConfirmed = confirm('Восстановление приведет к откату в исходное состояние текущей страницы, уверены?')
    if(isConfirmed){
      
        dispatch(setBackup({
          status: Statuses.LOADING,
         
        }))
        await delay(1500)

        adminAPI.restore(state.currenPage, backup)
        .then(data => {

          if(data.status === 0){
            dispatch(setBackup({
              status: Statuses.RESOLVED,
              response: data.response,
              statusCode: data.status
            }))

            console.log('Восстановлено..');
            open(state.currenPage)
          }
          else {
            dispatch(setBackup({
              status: Statuses.ERROR,
              response: data.response,
              statusCode: data.status
            }))
          }
        })
      
        .catch((e) => {
          console.log(e);
        })
    }
  }

  const fetchSrc = (page: string) => {
    dispatch(setApp(Statuses.LOADING))

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
          .then((data) => {
            //@ts-ignore
            options?.current?.iframe?.load('../$randTmp-page01.html', () => {


              enableEditig(options.current.iframe?.contentDocument?.body!, options.current.virtualDom!)
              injectStyles(options.current.iframe)
             
              dispatch(setApp(Statuses.RESOLVED))
              adminAPI.deletePage()
            })
          })



      })
      
      .catch((e: any) => {
        console.log(e);


      })
  }

  
  const open = (page: string) => {
    setState({
      ...state,
      currenPage: page
    })

    fetchSrc(page);
  };


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
    adminAPI.deletePage()
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
    loadBackups,
    restoreBackup,
    open,
    setState,
    state,
    save,
  }
}
