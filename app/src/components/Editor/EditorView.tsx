import React, { FC, FormEvent, FormEventHandler, RefObject, forwardRef, memo, useEffect, useRef } from "react";
import styled from "styled-components";
import { pageListSelector } from "../../store/slice/pagelist-slice";
import { useAppSelector } from "../../store/store";


const StyledEditor = styled.div`
     
`

type EditorViewProps = {
     pageList: string[]
     message: string
     inputRef: RefObject<HTMLInputElement>
     statusCode: 0 | 1
     createPage: (e: FormEvent<HTMLFormElement>) => void
     status: 'resolved' | 'pending' | 'rejected'
}

export const EditorView: FC<EditorViewProps> = memo(forwardRef(({ pageList, inputRef, statusCode, message, createPage, status }) => {

     const pages = (
          <div>
               {status !== 'pending' ? pageList.map((p, index) => (
                    <p key={index}>{p}</p>
               )) : <h2>Loading...</h2>}
          </div>
     )



     useEffect(() => {
          if (status === 'resolved') {
               if (statusCode === 0) {
                    if (inputRef.current) {
                         inputRef.current.value = ''
                    }
               }


          }



     }, [status])


     return (

          <StyledEditor >

               <form onSubmit={createPage}>
                    <input name='filename' ref={inputRef} type="text" />
                    <button type="submit">Создать новую страницу</button>

               </form>

               {message}
               {pages}


          </StyledEditor>
     )
}))
