import React, { memo, useEffect } from "react";
import { FC } from "react";
import { delay } from "../../utils/delay";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { APIBackupResponse } from "../../../api/service/admin-api";

type PageListProps = {
  backups: Array<APIBackupResponse>;
  deletePage?: (page: string) => void;
  afterBackup?: () => void
  restoreBackup: (backup: string) => void
};

export const BackupsList: FC<PageListProps> = ({ backups, restoreBackup, afterBackup }) => {

    return (
      <List>
        {backups.length ? backups.map((b) => (
          <ListItem key={b.backup_time} disablePadding>
            <ListItemButton  title="Нажмите для восстановления" onClick={async () => {
              restoreBackup(b.backup)
              console.log(b.backup);
              
              await delay(1500)
              afterBackup ? afterBackup(): () => {}
              
            }}>
              <ListItemText primary={b.backup} /><span>Создана от: {b.backup_time}</span>
            </ListItemButton>
          </ListItem>
        )): 'Резервные копии отсутствуют'}
      </List>
    );
}

