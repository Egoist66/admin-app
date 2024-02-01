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

type PageListProps = {
  files: string[];
  deletePage?: (page: string) => void;
  redirect?: (page: string) => void;
  afterRedirect: () => void
};

export const PagesList: FC<PageListProps> = ({ files, redirect, afterRedirect }) => {
    const pages = files.filter((item) => !item.startsWith("$randTmp-page01"));

    return (
      <List>
        {pages.map((p) => (
          <ListItem key={p} disablePadding>
            <ListItemButton onClick={() => {
              redirect ? redirect(p): () => {}
              afterRedirect()
              
            }}>
              <ListItemText primary={p} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
}

