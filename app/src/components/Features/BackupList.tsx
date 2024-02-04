import React, { memo, useEffect } from "react";
import { FC } from "react";
import { delay } from "../../utils/delay";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
  deletePage: (page: string) => void;
  afterBackup?: () => void
  restoreBackup: (backup: string) => void
};

export const BackupsList: FC<PageListProps> = ({ backups, deletePage, restoreBackup, afterBackup }) => {

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
              <span title={`Удалить копию ${b.backup}`} onClick={async (e) => {
                e.stopPropagation()
                console.log(b.backup);
                  
                deletePage(b.backup)

            
               
                  
              }}>
                <DeleteOutlineIcon color="error" />
              </span>
            </ListItemButton>
          </ListItem>
        )): 'Резервные копии отсутствуют'}
      </List>
    );
}

