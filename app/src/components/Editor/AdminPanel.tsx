import { Grid, Button } from "@mui/material";
import React from "react";
import { FC } from "react";
import { appSelector, editorSelector, setEditing, Statuses } from "../../../store/app-ui-action-slice";
import { ModalWindow } from "../Features/Modal";
import { PagesList } from "../Features/PagesList";
import { useToggle } from "../../hooks/useToggle";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {Notification} from '../Features/Notification'
import { BackupsList } from "../Features/BackupList";
import { APIBackupResponse } from "../../../api/service/admin-api";

type AdminPanelProps = {
    files: string[],
    backups: Array<APIBackupResponse>
    init: (page: string) => void
    save: () => Promise<void>
    loadBackups: () => void
    restoreBackup: (backup: string) => void

}

export const AdminPanel: FC<AdminPanelProps> = ({files, restoreBackup, backups, save, init}) => {

    AdminPanel.displayName = "AdminPanel"

    const dispatch = useAppDispatch();
    const { editing, backup } = useAppSelector(editorSelector);

    const [isOpeEdit, setOpenEdit] = useToggle();
    const [isOpenPages, setOpenPages] = useToggle();
    const [isOpenBackup, setOpenBackup] = useToggle();


  
  return (
    <>
      <Grid
        display={"flex"}
        className="panel"
        justifyContent={"flex-end"}
        gap={"20px"}
        flexWrap={"wrap"}
      >
        <Button onClick={() => setOpenEdit(true)} variant="contained">
          Опубликовать
        </Button>

        <Button onClick={() => setOpenPages(true)} variant="contained">
          Открыть страницы
        </Button>

        <Button color="warning" onClick={() => setOpenBackup(true)} variant="outlined">
          Восстановить
        </Button>
      </Grid>

        <ModalWindow
            status={editing.status}
            handlers={[
            {
                name: "Сохранить",
                handler: save,
                statusText: "Обновление...",
                variant: 'primary'
            },
            ]}
            title="Сохранение"
            render={() => "Уверены сохранить текущие изменения?"}
            isOpen={isOpeEdit}
            setToggle={setOpenEdit}
        />

        <ModalWindow
            handlers={[
            {
                name: "Отменить",
                handler: () => setOpenPages(false),
                variant: 'primary'
            },
            ]}
            title="Доступные страницы"
            isOpen={isOpenPages}
            setToggle={setOpenPages}
            render={() => (
            <>
                <PagesList
                afterRedirect={() => setOpenPages(false)}
                redirect={init}
                files={files}
                />
            </>
            )}


        
        />

        <ModalWindow
            handlers={[
            {
                name: "Отменить",
                handler: () => setOpenBackup(false),
                variant: 'warning'
            },
            ]}
            title={backup.status === Statuses.LOADING ? 'Восстановление...' : 'Восстановление из резервной копии'}
            isOpen={isOpenBackup}
            setToggle={setOpenBackup}
            render={() => (
            <>
              <BackupsList 
                restoreBackup={restoreBackup} 
                backups={backups}
                afterBackup={() => setOpenBackup(false)} 
              />
            </>
            )}

        />


       {editing.status === Statuses.RESOLVED || editing.status === Statuses.ERROR ?  <Notification
            variant="filled"
            onClose={() => dispatch(setEditing({ status: Statuses.IDLE }))}
            type={editing.status !== Statuses.ERROR ? "success" : "error"}
            message={editing.response!}
            status={editing.status === Statuses.RESOLVED || editing.status === Statuses.ERROR}
        />: null}
     
    </>
  );
};
