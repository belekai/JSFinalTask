import React, { useState } from 'react'
import { Alert, AlertTitle, Snackbar } from "@mui/material";

export default function Toast({
    open,
    setOpen,
    title,
    message,
    severity
}) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
  return (
    <Snackbar
        open={open}
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity={severity}>
            <AlertTitle>
                <strong>{title}</strong>
            </AlertTitle>
            {message}
            </Alert>
      </Snackbar>
  )
}
