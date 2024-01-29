import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import { useText } from "../../hooks/useText";
import '../../helpers/iframeLoader'
import { useEditor } from "../../hooks/useEditor";
import UIkit from "uikit";
import { useCatchUI } from "../../hooks/useCatchUI";

//import '../../../../node_modules/uikit/dist/js/uikit'

const StyledEditor = styled.div``;



export const EditorView: FC = () => {

  EditorView.displayName = 'Editor'

  const [newPage, setNewPage] = useText('')
  const {
    options,
    loadPages,
    save,
    fetchSrc,
    state
  } = useEditor()


  options.current.currentPage = 'index.html'
  const btnRef = useRef<HTMLButtonElement>(null)
  const {status, statusCode, response} = useCatchUI()

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
      console.log('====================================');
      console.log(status, statusCode, response);
      console.log('====================================');
  },[status, statusCode, response])

  useEffect(() => {
    init(options.current.currentPage)

      if(btnRef.current){
        btnRef.current.addEventListener('click', () => {
          save(() => {
            UIkit.notification({
              message: 'Успешно сохранено!',
              status: 'success',
              pos: 'top-left',
              timeout: 5000
          });
          })
          UIkit.modal('#modal-save').hide()
        })
      }
  }, [])


  return (
    <>
      <iframe src={options.current.currentPage} frameBorder="0"></iframe>


      <div className="panel">

        <button onClick={() => {
          UIkit.modal('#modal-save').show()

        }} className="uk-button uk-button-primary">Сохранить</button>

      </div>

      <div id="modal-save" uk-modal={true.toString()}>
        <div className="uk-modal-dialog uk-modal-body">
          <h2 className="uk-modal-title">Сохранение</h2>
          <p>Действительно хотите сохранить изменения?</p>
          <p className="uk-text-right">
            <button className="uk-button uk-button-default uk-modal-close" type="button">Отменить</button>
            <button ref={btnRef} className="uk-button uk-button-primary" type="button">Опубликовать</button>
          </p>
        </div>
      </div>









    </>
  );


}