import { Box } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import React from "react";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "20px",
        backgroundColor: "primary.main",
        position: 'fixed',
        bottom: '0',
        justifySelf: 'flex-end',
        color: "secondary.main",
        display: "flex",
        justifyContent: "center",
        fontWeight: 400,
      }}
    >
      Copyright © 2023 Akytė
    </Box>
  );
}
