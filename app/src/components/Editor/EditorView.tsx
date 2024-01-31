import React, { FC, useEffect } from "react";
import { useText } from "../../hooks/useText";
import '../../helpers/iframeLoader'
import { useEditor } from "../../hooks/useEditor";
import {useAppSelector } from "../../../store/store";
import {editorSelector} from "../../../store/app-ui-action-slice";
import Button from "@mui/material/Button";
import { ModalWindow } from "../Features/Modal";
import { useToggle } from "../../hooks/useToggle";
import { Notification } from "../Features/Notification";




export const EditorView: FC = () => {

  EditorView.displayName = 'Editor'

  const [isToggled, setOpen] = useToggle()
  const [newPage, setNewPage] = useText('')



  const {
    options,
    loadPages,
    save,
    fetchSrc,
    state
  } = useEditor()

  const {editing} = useAppSelector(editorSelector)
  options.current.currentPage = 'index.html'

  const open = (page: string) => {
    options.current.currentPage = page
    fetchSrc(page)

  }

  const init = (page: string) => {
    options.current.iframe = document.querySelector('iframe') as HTMLIFrameElement
    open(page)
    loadPages()
  }




  useEffect(() => {
    init(options.current.currentPage)

      
  }, [])




  return (
    <>
      <iframe src={options.current.currentPage} frameBorder="0"></iframe>


      <div className="panel">

        <Button onClick={() => setOpen(true)} variant="contained">Опубликовать</Button>

      </div>

      <ModalWindow
        response={editing.response!}
        status={editing.status}
        onClickHandler={save} 
        isOpen={isToggled} 
        setToggle={setOpen} 
      
      />

      <Notification 
        message={editing.response!} 
        status={editing.status}

      
      />




    </>
  );


}