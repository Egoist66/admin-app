import React, { FC, useEffect } from "react";
import { useText } from "../../hooks/useText";
import "../../helpers/iframeLoader";
import { useEditor } from "../../hooks/useEditor";
import {useAppSelector } from "../../../store/store";
import {Statuses,appSelector,editorSelector, setEditing} from "../../../store/app-ui-action-slice";
import { Preloader } from "../Features/Preloader";
import { AdminPanel } from "./AdminPanel";

export const Editor: FC = () => {

  Editor.displayName = "Editor";

  const [newPage, setNewPage] = useText("");
  const { status } = useAppSelector(appSelector);
  const {
    options, 
    deletePage, 
    save, 
    restoreBackup, 
    open, 
    loadPages, 
    loadBackups, 
    state} = useEditor();




  const init = (page: string) => {
    options.current.iframe = document.querySelector("iframe") as HTMLIFrameElement;
    open(page);
    loadPages();
    loadBackups();
  };

  useEffect(() => {
    init(state.currenPage);
   
  }, []);


  return (
    <>
      {status === Statuses.LOADING ?  <Preloader /> : null}

      <iframe src={""} frameBorder="0"></iframe>
      <AdminPanel 
        save={save}
        virtualDom={options.current.virtualDom}
        deletePage={deletePage}
        restoreBackup={restoreBackup}
        backups={state.backups} 
        loadBackups={loadBackups}
        files={state.files} 
        init={init} 
      />
     
    </>
  );
};
