import {
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  Dialog,
} from "@mui/material";
import React, { FC, ReactNode, memo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { delay } from "../../utils/delay";
import { Statuses } from "../../../store/app-ui-action-slice";

type HandlerTypes = "save" | "open";
type ButtonVariants = "inherit" | "success" | "error" | "info" | "warning" | "primary" | "secondary"

type ModalProps = {
  isOpen: boolean;
  response?: string;
  title?: string;
  hidden?: boolean
  fullScreen?: boolean
  render?: () => ReactNode;
  handlers?: Array<{
    statusText?: string;
    name?: string;
    variant?: ButtonVariants
    handler?: () => void;
  }>;
  status?: Statuses;
  setToggle: (isOpen: boolean) => void;
};

export const ModalWindow: FC<ModalProps> = ({
  isOpen,
  title,
  handlers,
  hidden,
  fullScreen,
  render,
  status,
  setToggle,
}) => {
  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      onClose={() => setToggle(false)}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <b>{title}</b>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setToggle(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          display: hidden ? 'none !important': '',
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom>{render ? render() : ""}</Typography>
      </DialogContent>
      <DialogActions>

        {handlers ? handlers.map((handle) => (
          <Button
            color={handle.variant ? handle.variant : 'primary'}
            key={handle?.handler?.toString()}
            disabled={status === Statuses.LOADING}
            onClick={() => {
             handle.handler ? handle.handler() : () => {};
              delay(1000).then(() => {
                setToggle(false);
              });
            }}
            variant="outlined"
            autoFocus
          >
            {status && status === Statuses.LOADING ? handle.statusText : handle.name}
          </Button>
        )): null}


      </DialogActions>
    </Dialog>
  );
};
