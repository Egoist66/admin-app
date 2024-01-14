import React, { FC, FormEvent, RefObject, forwardRef, memo, useEffect } from "react";
import styled from "styled-components";


const StyledEditor = styled.div`
     
`

type EditorViewProps = {
     data: {
          files: string[]
          message: string
          currentPage: string
          deletePage: (page: string) => void
          inputRef: RefObject<HTMLInputElement>
          statusCode: 0 | 1
          createPage: (e: FormEvent<HTMLFormElement>) => void
          status: 'resolved' | 'pending' | 'rejected'
     }
}

export const EditorView: FC<EditorViewProps> = memo(forwardRef(({ data }) => {

     const { files, currentPage, deletePage, inputRef, statusCode, message, createPage, status } = data

     EditorView.displayName = "EditorView"

     const pages = (
          <div>
               {status !== 'pending' ? files.map((p, index) => (
                    <div className="file-name" key={index}>{p}
                         <a onClick={() => deletePage(p)} href="#">Delete</a>
                    </div>
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
               {/* 
               <form onSubmit={createPage}>
                    <input data-value={inputRef?.current?.value} name='filename' ref={inputRef} type="text" />
                    <button disabled={status === 'pending'} type="submit">Создать новую страницу</button>

               </form>

               {message ? <p>{message}</p>: null}
               {pages} */}

               <iframe src={currentPage} frameBorder="0"></iframe>

          </StyledEditor>
     )
}))
