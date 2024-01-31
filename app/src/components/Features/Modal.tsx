import {
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  Dialog,
} from "@mui/material";
import React, { FC, memo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { delay } from "../../utils/delay";
import { Statuses } from "../../../store/app-ui-action-slice";

type ModalProps = {
  isOpen: boolean;
  response: string;
  status: Statuses;
  onClickHandler: () => void;
  setToggle: (isOpen: boolean) => void;
};

export const ModalWindow: FC<ModalProps> = ({
  isOpen,
  response,
  status,
  onClickHandler,
  setToggle,
}) => {
  return (
    <Dialog
      fullWidth
      onClose={() => setToggle(false)}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <b>Сохранение</b>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setToggle(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom>
          Уверены сохранить текущие изменения?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={status === Statuses.LOADING}  
          variant="outlined"
          autoFocus
          onClick={() => {
            onClickHandler();
            delay(1000).then(() => {
              setToggle(false);
            });
          }}
        >
         {status === Statuses.LOADING ? 'Обновление...' : ' Сохранить'}
        </Button>
      </DialogActions>

      
    </Dialog>
  );
};
