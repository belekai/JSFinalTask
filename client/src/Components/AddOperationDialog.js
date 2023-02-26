import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Popper } from "@mui/material";
import AutoCompleteField from "./Common/AutoCompleteField";
import { Stack } from "@mui/system";
import axiosClient from "../Api/axiosClient";

export default function AddOperationDialog({
  open,
  setOpen,
  project,
  services,
  getProjectOperationsList,
  workforceTypes,
  setToastMessage,
  setOpenToast,
  setToastSeverity
}) {
  const [selectedServiceId, setSelectedServiceId] = useState();
  const [newOperationDescription, setNewOperationDescription] = useState();
  const [selectedWorkforce, setSelectedWorkforce] = useState();


  function handleClose() {
    getProjectOperationsList()
    setNewOperationDescription(null)
    setSelectedServiceId(null)
    setSelectedWorkforce(null)
    setOpen(false);
  }

  function submitOperation() {
    if (selectedServiceId && selectedWorkforce) {
      axiosClient({
        method: "post",
        url: "/operations",
        data: {
          projectId: project.id,
          description: newOperationDescription? newOperationDescription : null,
          serviceId: selectedServiceId.id,
          workforceId: selectedWorkforce.id,
        },
      })
      .then( response => {
        if(response.status === 200){
          setOpenToast(true)
          setToastSeverity('success')
          setToastMessage('Operacija pridėta sėkmingai')
          handleClose()
        }
      })
    }
  }

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        disableScrollLock={true}
      >
        <DialogTitle>Nauja operacija</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              sx={{ marginTop: 1, width: "100%" }}
              disabled
              defaultValue={project && project.project_name}
              label="Projekto kodas"
            />

            <AutoCompleteField
              options={services}
              setValue={setSelectedServiceId}
              setOptionLabel={(option) => option.service_name}
              label="Paslaugos pavadinimas"
              required={true}
            />
            <AutoCompleteField
              options={workforceTypes}
              setValue={setSelectedWorkforce}
              setOptionLabel={(option) => option.workforce_type}
              label="Darbuotojas"
            />
            <TextField label="Komentaras" onChange={ (e) => {setNewOperationDescription(e.target.value)}}></TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitOperation} variant="contained">
            Pridėti
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
