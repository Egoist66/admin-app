import { Grid, Button } from "@mui/material";
import React, { memo } from "react";
import { FC } from "react";
import {
  editorSelector,
  setDeleting,
  setEditing,
  setUpload,
  Statuses,
} from "../../../store/app-ui-action-slice";
import { ModalWindow } from "../Features/Modal";
import { PagesList } from "../Features/PagesList";
import { useToggle } from "../../hooks/useToggle";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { Notification } from "../Features/Notification";
import { BackupsList } from "../Features/BackupList";
import { APIBackupResponse } from "../../../api/service/admin-api";
import { EditorMetaInfo } from "./MetaEditor";
import { useMeta } from "../../hooks/useMeta";
import { AuthSelector } from "../../../store/app-auth-slice";
import { useLogin } from "../../hooks/useLogin";

type AdminPanelProps = {
  files: string[];
  backups: Array<APIBackupResponse>;
  deletePage: (page: string) => void;
  init: (page: string) => void;
  save: () => Promise<void>;
  loadBackups: () => void;
  virtualDom: Document | null;
  restoreBackup: (backup: string) => void;
};

export const AdminPanel: FC<AdminPanelProps> = memo(
  ({ files, deletePage, restoreBackup, backups, virtualDom, save, init }) => {
    AdminPanel.displayName = "AdminPanel";

    const dispatch = useAppDispatch();
    const {logout} = useLogin()
    const { editing, backup, deleting, uploading } =
      useAppSelector(editorSelector);
    const { isAuth } = useAppSelector(AuthSelector);

    const [isOpeEdit, setOpenEdit] = useToggle();
    const [isOpenPages, setOpenPages] = useToggle();
    const [isOpenBackup, setOpenBackup] = useToggle();
    const [isOpenMeta, setOpenMeta] = useToggle();

    const { onChangeMeta } = useMeta(virtualDom);

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

          <Button
            color="warning"
            onClick={() => setOpenBackup(true)}
            variant="outlined"
          >
            Восстановить
          </Button>

          <Button
            color="info"
            onClick={() => setOpenMeta(true)}
            variant="outlined"
          >
            Редактировать мета
          </Button>

          {isAuth ? (
            <Button onClick={logout} color="error" variant="outlined">
              Выход
            </Button>
          ) : null}
        </Grid>

        <ModalWindow
          status={editing.status}
          handlers={[
            {
              name: "Сохранить",
              handler: save,
              statusText: "Обновление...",
              variant: "primary",
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
              variant: "primary",
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
          fullScreen
          handlers={[
            {
              name: "Отменить",
              handler: () => setOpenBackup(false),
              variant: "warning",
            },
          ]}
          title={
            backup.status === Statuses.LOADING
              ? "Восстановление..."
              : "Восстановление из резервной копии"
          }
          isOpen={isOpenBackup}
          setToggle={setOpenBackup}
          render={() => (
            <>
              <BackupsList
                restoreBackup={restoreBackup}
                deletePage={deletePage}
                backups={backups}
                afterBackup={() => setOpenBackup(false)}
              />
            </>
          )}
        />

        <ModalWindow
          title="Редактирование мета тегов"
          render={() => (
            <>
              <EditorMetaInfo
                save={save}
                onChangeMeta={onChangeMeta}
                virtualDom={virtualDom}
              />
            </>
          )}
          isOpen={isOpenMeta}
          setToggle={setOpenMeta}
        />

        {editing.status === Statuses.RESOLVED ||
        editing.status === Statuses.ERROR ? (
          <Notification
            variant="filled"
            onClose={() => dispatch(setEditing({ status: Statuses.IDLE }))}
            type={editing.status !== Statuses.ERROR ? "success" : "error"}
            message={editing.response!}
            status={
              editing.status === Statuses.RESOLVED ||
              editing.status === Statuses.ERROR
            }
          />
        ) : null}

        {deleting.status === Statuses.RESOLVED ||
        deleting.status === Statuses.ERROR ? (
          <Notification
            variant="filled"
            onClose={() => dispatch(setDeleting({ status: Statuses.IDLE }))}
            type={deleting.status !== Statuses.ERROR ? "success" : "error"}
            message={deleting.response!}
            status={
              deleting.status === Statuses.RESOLVED ||
              deleting.status === Statuses.ERROR
            }
          />
        ) : null}

        {uploading.status === Statuses.LOADING ? (
          <Notification
            variant="filled"
            onClose={() => dispatch(setUpload({ status: Statuses.IDLE }))}
            type={uploading.status === Statuses.LOADING ? "success" : "error"}
            message={uploading.response!}
            status={uploading.status === Statuses.LOADING}
          />
        ) : null}

        {uploading.status === Statuses.RESOLVED ||
        uploading.status === Statuses.ERROR ? (
          <Notification
            variant="filled"
            onClose={() => dispatch(setUpload({ status: Statuses.IDLE }))}
            type={uploading.status !== Statuses.ERROR ? "success" : "error"}
            message={uploading.response!}
            status={
              uploading.status === Statuses.RESOLVED ||
              uploading.status === Statuses.ERROR
            }
          />
        ) : null}
      </>
    );
  }
);
