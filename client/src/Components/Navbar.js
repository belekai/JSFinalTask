import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "48px",
        backgroundColor: "primary.main",
      }}
    >
      <Stack 
      direction='row'
      sx={{
        height: '100%'
      }}
       >

      
          <Box
          component={Link}
          to={'/'}
          sx={{ 
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            pl: 3,
           }}
          >
            <img
              style={{ width: 160, height: 25 }}
              src="/akyte.png"
              alt="Logo"
            />
          </Box>
      </Stack>
    </Box>
  );
}
