import React, { useState, useEffect } from "react";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import axiosClient from "../Api/axiosClient";
import { DataGrid } from "@mui/x-data-grid";
import { Autocomplete, TextField, Typography } from "@mui/material";
import AutoCompleteField from "../Components/Common/AutoCompleteField";
import userEvent from "@testing-library/user-event";
import { Stack } from "@mui/system";
import { getProjects, getClients } from '../Api/services/HomepageService'

export default function Homepage() {
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [client, setClient] = useState();
  const [selectProject, setSelectProject] = useState();
  const [selectedItem, setSelectedItem] = useState({
    client: {},
    project: {},
  });

  //---------------------------------------------FUNCTIONS---------------------------------------------

  function handleClientSelected(client) {
    setSelectedItem({
      client: client,
      project: null,
    });
  }

  function handleProjectSelected(project) {
    let client = clients.find((it) => it.id === project?.client_id);

    setSelectedItem({
      client: client ? client : null,
      project: project,
    });
  }

  useEffect(() => {
    setSelectedItem({ client: null, project: null });
    getProjects(setProjects);
    getClients(setClients);
  }, []);

  useEffect(() => console.log(selectedItem), [selectedItem]);
  useEffect(() => console.log(clients), [clients]);
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
        <Stack
          direction="column"
          sx={{
            alignItems: "center",
          }}
        >
          <Stack direction="column" spacing={2}>
            <AutoCompleteField
              options={clients}
              setOptionLabel={(option) => option.client_name}
              setValue={(newValue) => handleClientSelected(newValue)}
              label="Kliento pavadinimas"
              sx={{ width: 500 }}
            />
            <Typography align="center">Arba</Typography>
            <AutoCompleteField
              options={projects}
              setOptionLabel={(option) => option.project_name}
              setValue={(newValue) => handleProjectSelected(newValue)}
              label="Projekto pavadinimas"
              sx={{ width: 500 }}
            />
          </Stack>

          <Button
            disabled={!selectedItem.client}
            component={Link}
            to={`/client/${selectedItem?.client?.id}`}
            state={{ selectedItem }}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Pasirinkti
          </Button>
        </Stack>
    </Box>
  );
}
