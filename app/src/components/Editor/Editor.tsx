import React, { FC, useEffect } from "react";
import { EditorView } from "./EditorView";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchPages } from "../../store/slice/pagelist-slice";


export const Editor: FC = () => {
     
     const dispatch = useAppDispatch()
     const { pageList, status } = useAppSelector(state => state.pageList)

     useEffect(() => {
          dispatch(fetchPages())
     }, [])



     return (


          <EditorView
               status={status}
               pageList={pageList}
          />
     )
}