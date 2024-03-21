import React from "react";
//import { Link } from 'react-router-dom';

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { AppBar, IconButton, Toolbar } from "@mui/material";

const Header = (props) => {
  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
