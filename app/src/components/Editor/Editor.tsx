import React, { FC, FormEvent, useCallback, useEffect, useRef } from "react";
import { EditorView } from "./EditorView";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { createPages, fetchPages, pageListSelector } from "../../store/slice/pagelist-slice";


export const Editor: FC = () => {
     
     const dispatch = useAppDispatch()
     const {pageList, status, message, statusCode} = useAppSelector(pageListSelector)
     const inputRef = useRef<HTMLInputElement>(null)



     const createPage = useCallback((e: FormEvent<HTMLFormElement> ) => {
          e.preventDefault()
          if(inputRef.current){
               if(inputRef.current.value === ''){
                    return
               }
          }

          const formData = new FormData(e.currentTarget)
          dispatch(createPages(formData))
     }, [])
     

     useEffect(() => {
          dispatch(fetchPages())
     }, [])


     return (


          <EditorView

               status={status}
               inputRef={inputRef}
               statusCode={statusCode}
               message={message}
               createPage={createPage}
               pageList={pageList}
          />
     )
}