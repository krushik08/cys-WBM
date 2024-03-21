import React from "react";
import logoicn from "../../../assets/images/logo.png";
import { Box } from "@mui/material";
const LogoIcon = (props) => {
  return (
    <Box component={"img"} alt="Logo" src={logoicn} {...props} width={100} />
  );
};

export default LogoIcon;
