import React, { FC, memo } from "react";
import styled from "styled-components";


const StyledEditor = styled.div`
     
`

type EditorViewProps = {
     pageList: string[]
     status: 'resolved' | 'pending' | 'rejected'
}

export const EditorView: FC<EditorViewProps> = memo(({pageList, status}) => {
     return (

          <StyledEditor >

               <input type="text" />
               <button type="button">Создать новую страницу</button>


              <div>
              {status !== 'pending' ? pageList.map((p, index) => (
          
                    <p key={index}>{p}</p>
               )): <h2>Loading...</h2>}
              </div>

          </StyledEditor>
     )
})
