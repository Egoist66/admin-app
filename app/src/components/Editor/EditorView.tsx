import React, {
  FC,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { delay } from "../../utils/delay";
import { adminAPI } from "../../../api/service/admin-api";

const StyledEditor = styled.div``;


type EditorViewType = {
  files: string[]
  newPage: string
  status: 0 | 1
  response: string
}

export const EditorView: FC = () => {

  const [state, setState] = useState<EditorViewType>({
   files: [],
   newPage: '',
   status: 0, 
   response: ''
  
  })

  const loadPages = () => {
    adminAPI.loadPageList()
      .then(pages => setState({...state, files: pages}))
      .catch((e) => console.log(e))
  }

  const createPage = (e: FormEvent) => {
    e.preventDefault()

    adminAPI.createNewPage(state.newPage)
      .then(data => {
         setState((state) => ({
           ...state,
           files: data?.files?.length ? [...data.files]: [...state.files],
           status: data.status,
           response: data.response
         }))
      })
      .catch((e) => {
        console.log(e);
        
      })
  }

  const deletePage = (page: string) => {
    adminAPI.deletePage(page)
    .then(data => {
      setState((state) => ({
        ...state,
        status: data.status,
        response: data.response,
      }))
      
    })
    .then(loadPages)
    .catch((e) => {
      console.log(e);
      
    })
  }

  useEffect(() => {
     loadPages()
      
  }, [])

  const pages = state.files.map(p => (
    <div key={p}>
      <h2>{p}</h2>
      <button onClick={() => deletePage(p)}>Delete</button>
    </div>
  ))
    return (
      <StyledEditor>
        
               <form onSubmit={createPage}>
                    <input onChange={(e) => setState({...state, newPage: e.currentTarget.value})} data-value={state.newPage} name='filename' type="text" />
                    <button  type="submit">Создать новую страницу</button>

               </form>

               {pages}


          {/* <iframe  src={'/'} frameBorder="0"></iframe> */}

       

      </StyledEditor>
    );
  

}