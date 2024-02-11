import React, { FC, useEffect } from "react";
import { useText } from "../../hooks/useText";
import "../../helpers/iframeLoader";
import { useEditor } from "../../hooks/useEditor";
import { useAppSelector } from "../../../store/store";
import { Statuses, appSelector } from "../../../store/app-ui-action-slice";
import { Preloader } from "../Features/Preloader";
import { AdminPanel } from "./AdminPanel";
import { Input, TextField } from "@mui/material";
import { AuthSelector } from "../../../store/app-auth-slice";
import { ModalWindow } from "../Features/Modal";
import { Login } from "../Login/Login";
import { useLogin } from "../../hooks/useLogin";

export const Editor: FC = () => {
  Editor.displayName = "Editor";

  const [newPage, setNewPage] = useText("");
  const { status } = useAppSelector(appSelector);
  const { isAuth } = useAppSelector(AuthSelector);

  const {
    options,
    deletePage,
    save,
    restoreBackup,
    open,
    loadPages,
    loadBackups,
    state,
  } = useEditor();

  const {checkAuth} = useLogin()

  const init = (page: string) => {
      if(isAuth){
        options.current.iframe = document.querySelector(
          "iframe"
        ) as HTMLIFrameElement;
        open(page);
        loadPages();
        loadBackups();
      }
  };

  useEffect(() => {
      if(!isAuth){
        checkAuth()
      }
  }, [])

  useEffect(() => {
    init(state.currenPage);
  }, [isAuth]);

  if (!isAuth) {
    return (
      <ModalWindow
        hidden={true}
        title="Вход в систему"
        render={() => <Login />}
        isOpen={!isAuth}
        setToggle={() => {}}
      />
    );
  }

  return (
    <>
      {status === Statuses.LOADING ? <Preloader /> : null}

      <iframe src={""} frameBorder="0"></iframe>
      <input hidden accept="image/*" id="img-upload" type="file" />
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
