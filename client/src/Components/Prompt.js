import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export default function Prompt({ open, setOpen, object, setObject, disableOperation }) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{object.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {object.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={ () => handleClose() }>Ne</Button>
        <Button onClick={ () => {setObject({...object, result:true}); handleClose()}}>Taip</Button>
      </DialogActions>
    </Dialog>
  );
}
