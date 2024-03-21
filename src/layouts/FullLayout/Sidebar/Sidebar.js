import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { SidebarWidth } from "../../../assets/global/Theme-variable";
import LogoIcon from "../Logo/LogoIcon";
import Menuitems from "./data";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Sidebar = (props) => {
  const [open, setOpen] = React.useState(-1);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    setOpen(open === index ? -1 : index);
  };

  const SidebarContent = (
    <Box
      sx={{
        p: 3,
        height: "calc(100vh - 40px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link to="/">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LogoIcon />
        </Box>
      </Link>

      <Box>
        <List
          sx={{
            mt: 4,
          }}
        >
          {Menuitems.map((item, index) => {
            return (
              <List component="li" disablePadding key={item.title}>
                <ListItem
                  onClick={() => handleClick(index)}
                  button
                  component={NavLink}
                  to={item.href}
                  selected={pathDirect === item.href}
                  sx={{
                    mb: 1,
                    ...(pathDirect === item.href && {
                      color: "white",
                      backgroundColor: (theme) =>
                        `${theme.palette.primary.main}!important`,
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ...(pathDirect === item.href && { color: "white" }),
                    }}
                  >
                    <item.icon width="20" height="20" />
                  </ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                  {item.subItems &&
                    item.subItems.length > 0 &&
                    (open === index ? <ExpandLess /> : <ExpandMore />)}
                </ListItem>
                <Collapse in={open === index} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems &&
                      item.subItems.length > 0 &&
                      item.subItems.map((subItem) => (
                        <ListItem
                          button
                          component={NavLink}
                          to={subItem.href}
                          selected={pathDirect === subItem.href}
                          sx={{
                            mb: 1,
                            ml: 4,
                            width: "calc(100% - 32px)",
                            ...(pathDirect === subItem.href && {
                              color: "white",
                              backgroundColor: (theme) =>
                                `${theme.palette.primary.main}!important`,
                            }),
                          }}
                        >
                          <ListItemText>{subItem.title}</ListItemText>
                        </ListItem>
                      ))}
                  </List>
                </Collapse>
              </List>
            );
          })}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Box mb={5}>
        <List component="li" disablePadding>
          <ListItem
            component={NavLink}
            sx={{
              cursor: "pointer",
              mb: 1,
              color: "#000",
              backgroundColor: "rgba(0, 0, 0, 0.04)",

              ":hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
            to={"/login"}
          >
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText>Logout</ListItemText>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={props.isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      PaperProps={{
        sx: {
          width: SidebarWidth,
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

export default Sidebar;
