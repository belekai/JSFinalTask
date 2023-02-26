import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListItem, ListItemText, List, ListItemButton, Box, Typography } from "@mui/material";

export default function Ciklai() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://localhost:7080/api/v1/services",
    }).then((response) => {
      setServices(response.data.servicesList);
    });
  }, []);
  return (
    <Box sx={{display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center'
    }}>
      <Typography variant="h4"> Standartinių paslugų krepšelis</Typography>
      <List
        sx={{
          width: 300,
          overflow: "auto",
          maxHeight: 300,
          backgroundColor: "#fff",
        }}
      >
        {services.map((service) => (
          <ListItem key={service.id}>
            <ListItemText>{service.id}</ListItemText>
            <ListItemText>{service.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
