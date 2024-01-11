import React, { FC, FormEvent, useCallback, useEffect, useRef } from "react";
import { EditorView } from "./EditorView";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { delay } from '../../utils/delay'
import { clearMessage, createPages, deletePages, fetchPages, pageListSelector } from "../../store/slice/pagelist-slice";


export const Editor: FC = () => {

     const dispatch = useAppDispatch()
     const { pageList, status, message, statusCode } = useAppSelector(pageListSelector)
     const inputRef = useRef<HTMLInputElement>(null)



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

     }, [pageList.length])

     useEffect(() => {
          dispatch(fetchPages())
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
          createPage,
          deletePage,
          pageList
     }

     return (


          <EditorView data={{...data}}  />
     )
}