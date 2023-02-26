import {
  Autocomplete,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AutoCompleteField from "../Components/Common/AutoCompleteField";
import { Link, Route, useParams, useLocation } from "react-router-dom";
import AddOperationDialog from "../Components/AddOperationDialog";
import axiosClient from "../Api/axiosClient";
import DeleteIcon from "@mui/icons-material/Delete";
import AddMeasurementDialog from "../Components/AddMeasurementDialog";
import { AddRounded } from "@mui/icons-material";
import {
  getProjectOperations,
  getProjects,
  getWorkforceTypes,
  // disableOperation,
  // swapOperations,
  getClient
} from "../Api/services/ClientServices";
import Toast from "../Components/Common/Toast";
import Prompt from "../Components/Prompt";

export default function Client() {
  const [projectOperations, setProjectOperations] = useState([]);
  const [project, setProject] = useState();
  const [service, setService] = useState();
  const { id } = useParams();
  const [client, setClient] = useState();
  const [projects, setProjects] = useState();
  const [openAddOperation, setOpenAddOperation] = useState(false);
  const [openAddMeasurement, setOpenAddMeasurement] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [workforceTypes, setWorkforceTypes] = useState([]);
  const [toastMessage, setToastMessage] = useState();
  const [toastSeverity, setToastSeverity] = useState();
  const [projectCycleTime, setProjectCycleTime] = useState();
  const [projectCost, setProjectCost] = useState();
  const [projectOperationsCount, setProjectOperationsCount] = useState();
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [
    projectOperationsCountNotMeasured,
    setProjectOperationsCountNotMeasured,
  ] = useState();
  const [projectBottleneck, setProjectBottleneck] = useState();
  const [deletePrompt, setDeletePrompt] = useState({
    title: "Ištrinti įrašą",
    content: "Ar tikrai nori ištrinti įrašą?",
    id: "",
    result: false,
  });

  //--------------------------------------------DATAGRID----------------------------------------------------------------------

  const columns = [
    { field: "execution_order", headerName: "Nr.", width: 40 },
    { field: "service_name", headerName: "Operacija", width: 230 },
    { field: "workforce_type", headerName: "Atlieka", width: 250 },
    { field: "cycle_time", headerName: "Ciklas, s", width: 100 },
    { field: "operation_cost", headerName: "Savikaina, Eur", width: 130 },
    {
      field: "measurement",
      headerName: "",
      width: 65,
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              setService(params.row);
              handleClickOpenMeasurement();
            }}
          >
            <AddRounded fontSize="large" />
          </IconButton>
        );
      },
    },
    {
      field: "comment",
      headerName: "Komentaras",
      width: 430,
      renderCell: (params) => {},
    },
    {
      field: "actions",
      headerName: "",
      width: 130,
      renderCell: (params) => {
        return (
            <IconButton
              onClick={() => {
                // handleDeleteClick(params.row.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
        );
      },
    },
  ];
  //--------------------------------------------FUNCTIONS----------------------------------------------------------------------

  // async function handleUpArrowClick(params) {
  //   let currentRowOperationId = params.row.operationId;
  //   let sortedRows = params.api.getSortedRows();
  //   let currentRowIndex = sortedRows.findIndex(
  //     (row) => row.operationId == currentRowOperationId
  //   );
  //   let rowAbove = sortedRows[currentRowIndex - 1];
  //   if (rowAbove) {
  //     var rowAboveOperationId = rowAbove.operationId;
  //   }
  //   if (currentRowOperationId && rowAboveOperationId) {
  //     console.log(
  //       "current row operation id",
  //       currentRowOperationId,
  //       "current row index ",
  //       currentRowIndex,
  //       "\n",
  //       "above row operation id",
  //       rowAboveOperationId,
  //       "current row index ",
  //       sortedRows[currentRowIndex - 1]
  //     );
  //     swapOperations(
  //       currentRowOperationId,
  //       rowAboveOperationId,
  //       getProjectOperationsList
  //     );
  //   } else {
  //     setToastSeverity("error");
  //     setToastMessage("Ne nu...");
  //     setOpenToast(true);
  //   }
  // }

  // async function handleDownArrowClick(params) {
  //   let currentRowOperationId = params.row.operationId;
  //   let sortedRows = params.api.getSortedRows();
  //   let currentRowIndex = sortedRows.findIndex(
  //     (row) => row.operationId == currentRowOperationId
  //   );
  //   let rowBelow = sortedRows[currentRowIndex + 1];
  //   if (rowBelow) {
  //     var rowBelowOperationId = rowBelow.operationId;
  //   }
  //   if (currentRowOperationId && rowBelowOperationId) {
  //     swapOperations(
  //       currentRowOperationId,
  //       rowBelowOperationId,
  //       getProjectOperationsList
  //     );
  //   } else {
  //     setToastSeverity("error");
  //     setToastMessage("Uh-oh");
  //     setOpenToast(true);
  //   }
  // }

  // async function handleDeleteClick(id) {
  //   setDeletePrompt({ ...deletePrompt, id: id });
  //   setOpenDeleteConfirmation(true);
  // }

  // open dialog add operation
  function handleClickOpenOperation() {
    setOpenAddOperation(true);
  }

  // open dialog add measurement
  function handleClickOpenMeasurement() {
    setOpenAddMeasurement(true);
  }

  //get all services
  useEffect(() => {
    axiosClient.get("/services").then((response) => {
      setServicesList(response.data);
    });
  }, []);

  function getProjectOperationsList() {
    getProjectOperations(
      project,
      setProjectOperations,
      setProjectCycleTime,
      setProjectCost,
      setProjectOperationsCount,
      setProjectOperationsCountNotMeasured,
      setProjectBottleneck
    );
  }

  //--------------------------------------------HOOKS----------------------------------------------------------------------

  useEffect(() => {
    if (project) {
      getProjectOperationsList();
    }
  }, [project]);

  let { state } = useLocation();

  useEffect(() => {
    let navigatedProject = state.selectedItem.project;
    if (navigatedProject) {
      console.log(navigatedProject);
      setProject(navigatedProject);
    }
  }, [state]);

  useEffect(() => {
    getClient(id, setClient);
    getProjects(setProjects, id);
    getWorkforceTypes(setWorkforceTypes);
  }, []);

  // useEffect(() => {
  //   if (deletePrompt.result) {
  //     disableOperation(deletePrompt.id, getProjectOperationsList);
  //     setDeletePrompt({ ...deletePrompt, id: null, result: false });
  //   }
  // }, [deletePrompt.result]);

  useEffect(() => console.log(project),[project])

  //-----------------------------------------------------------------------------------------------------------------------

  return (
    <Box sx={{ height: "100%" }}>
      <Toast
        open={openToast}
        setOpen={setOpenToast}
        severity={toastSeverity}
        message={toastMessage}
      />
      <Prompt
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
        object={deletePrompt}
        setObject={setDeletePrompt}
        // disableOperation={disableOperation}
      />

      <AddOperationDialog
        open={openAddOperation}
        setOpen={setOpenAddOperation}
        project={project}
        services={servicesList}
        getProjectOperationsList={getProjectOperationsList}
        workforceTypes={workforceTypes}
        setOpenToast={setOpenToast}
        setToastMessage={setToastMessage}
        setToastSeverity={setToastSeverity}
      />
      <AddMeasurementDialog
        open={openAddMeasurement}
        setOpen={setOpenAddMeasurement}
        project={project}
        service={service}
        getProjectOperationsList={getProjectOperationsList}
        setOpenToast={setOpenToast}
        setToastMessage={setToastMessage}
        setToastSeverity={setToastSeverity}
      />
      <Stack spacing={2}>
        <Paper>
          <Typography align="center" variant="h4">
            {client && client.client_name}
          </Typography>
        </Paper>
        <Paper>
          <Box sx={{ height: 50, padding: 3 }}>
            <Typography align="left">
              <strong>Projektų skaičius</strong>: {projects && projects.length}
            </Typography>
          </Box>
        </Paper>

        <Grid container spacing={2}>
          <Grid xs={3}>
            <Stack spacing={2}>
              <Box>
                {projects && (
                  <AutoCompleteField
                    value={project}
                    options={projects}
                    setValue={setProject}
                    label="Projekto kodas"
                    setOptionLabel={(option) => option.project_name}
                  />
                )}
              </Box>
              <Paper sx={{ height: "100%" }}>
                <Stack spacing={1}>
                  {projectOperationsCount > 0 && (
                    <Typography>
                      <strong>Operacijų kiekis</strong>:{" "}
                      {projectOperationsCount}{" "}
                      {projectOperationsCountNotMeasured > 0 ? (
                        <>(neišmatuotų: {projectOperationsCountNotMeasured} )</>
                      ) : (
                        <>(Viskas išmatuota)</>
                      )}
                    </Typography>
                  )}
                  {projectCost > 0 && (
                    <Typography>
                      <strong>Projekto savikaina</strong>: {projectCost} Eur{" "}
                    </Typography>
                  )}
                  {projectCycleTime > 0 && (
                    <Typography>
                      <strong>Grynas gamybinis ciklas</strong>:{" "}
                      {projectCycleTime}s
                    </Typography>
                  )}
                  {projectBottleneck && (
                    <Typography>
                      <strong>Butelio kakliukas</strong>: {projectBottleneck}
                    </Typography>
                  )}
                </Stack>
              </Paper>
            </Stack>
          </Grid>
          <Grid xs={9}>
            <div style={{ height: 500, width: "100%" }}>
              <Button
                variant="contained"
                onClick={handleClickOpenOperation}
                sx={{ mb: 1 }}
              >
                Pridėti operaciją
              </Button>
              <span></span>
              <DataGrid
                getRowId={(row) => row.id}
                rows={projectOperations}
                columns={columns}
                hideFooter
              />
            </div>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
