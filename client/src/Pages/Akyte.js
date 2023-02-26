import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import AddMeasurement from "./AddMeasurement";
import Ciklai from "./Ciklai";
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Homepage from "./Homepage";
import Client from "./Client";

export default function Akyte() {
  return (
    <Box id="page-wrapper" sx={{ height: "100%" }}>
      <Navbar />
      <Box id="content-wrapper" sx={{ pb: "20px", height: "100%" }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
