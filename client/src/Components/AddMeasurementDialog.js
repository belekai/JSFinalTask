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
import { getProjects } from "../Api/services/ClientServices";

export default function AddMeasurementDialog({
  open,
  setOpen,
  project,
  service,
  getProjectOperationsList,
  setOpenToast,
  setToastMessage,
  setToastSeverity
}) {
  const [batches, setBatches] = useState();
  const [selectedBatch, setSelectedBatch] = useState();
  const [cycle, setCycle] = useState();
  const [sampleSize, setSampleSize] = useState();
  const [comment, setComment] = useState();

  //--------------------------------------------FUNCTIONS----------------------------------------------------------------------

  function submitMeasurement() {
    if (selectedBatch && cycle && sampleSize) {
      axiosClient({
        method: "post",
        url: "/measurements",
        data: {
          batchId: selectedBatch.id,
          operationId: service.id,
          sampleSize: sampleSize,
          cycleTime: cycle,
          comment: comment ? comment : null,
        },
      }).then((response) => {
        if (response.status === 200) {
          handleClose()
        }
      })
      .catch( error => {
      setToastSeverity('error')
      setToastMessage(error.response.data.errors[0])
      setOpenToast(true)
      })
    }
  }

  function getBatches() {
    if (typeof project !== "undefined" && project !== null) {
      axiosClient({
        method: "get",
        url: `/batches/project/${project.id}`,
      })
        .then((response) => {
          setBatches(response.data);
        })
        .catch((error) => console.log(error))
    }
  }

  useEffect(() => {
    if (open === true) {
      console.log(service);
      getBatches();
    }
  }, [open]);

  function handleClose() {
    setSelectedBatch(null)
    setCycle(null)
    setSampleSize(null)
    setComment(null)
    setOpen(false);
    getProjectOperationsList()
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
        <DialogTitle>Naujas matavimas</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              sx={{ marginTop: 1, width: "100%" }}
              disabled
              defaultValue={project && project.project_name}
              label="Projekto kodas"
            />
            <Stack direction="row" gap={2}>
              <TextField
                sx={{ marginTop: 1, width: "20%" }}
                disabled
                defaultValue={service && service.execution_order}
                label="Operacijos nr."
              />
              <TextField
                sx={{ marginTop: 1, width: "80%" }}
                disabled
                defaultValue={service && service.service_name}
                label="Operacija"
              />
            </Stack>
            <AutoCompleteField
              options={batches}
              setValue={setSelectedBatch}
              setOptionLabel={(option) => option.batch_name}
              label="Partija"
            />
            
            <TextField
              label="Ciklas, s"
              onChange={(e) => {
                setCycle(e.target.value);
              }}
            />
            <TextField
              label="Matavimo imtis, vnt."
              onChange={(e) => {
                setSampleSize(e.target.value);
              }}
            />
            <TextField
              label="Komentaras"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitMeasurement} variant="contained">
            Pridėti
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
