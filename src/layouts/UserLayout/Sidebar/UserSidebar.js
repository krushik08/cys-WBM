import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
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

//
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

//
const UserSidebar = (props) => {
  const [open, setOpen] = React.useState(-1);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
      const userData = JSON.parse(localStorage.getItem('user-info'));


  const handleClick = (index) => {
    setOpen(open === index ? -1 : index);
  };

  const SidebarContent = (
    <Box
      sx={{
        p: 3,
        height: 'calc(100vh - 40px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* <Link to="/">
        <Box sx={{ display: "flex", alignItems: "Center" }}>
          <LogoIcon />
        </Box>
      </Link> */}

      <Stack direction={'row'} alignItems="center" gap={3} mt={2}>
        <Avatar
          {...stringAvatar(`${userData?.firstName} ${userData?.lastName}}`)}
          sx={{ width: 56, height: 56, textTransform: 'uppercase' }}
        />
        <Stack direction={'column'} gap={1}>
          <Typography
            variant="h1"
            textAlign={'justify'}
            fontWeight={'bold'}
            color="secondary"
            textTransform={'capitalize'}
          >
            {userData?.firstName} <br /> {userData?.lastName}
          </Typography>
          {/* <Typography variant="h3" fontWeight={'bold'} color={'green'}>
            <small>Balance:</small> 100
          </Typography> */}
        </Stack>
      </Stack>

      {/* <Stack direction={'row'} gap={1} justifyContent={'space-evenly'} mt={2}>
        <Stack direction={'column'} gap={1} alignItems={'center'}>
          <Typography variant="h5">Block</Typography>
          <Typography variant="h5" fontWeight={'bold'}>
            2
          </Typography>
        </Stack>
        <Stack direction={'column'} gap={1} alignItems={'center'}>
          <Typography variant="h5">Lot</Typography>
          <Typography variant="h5" fontWeight={'bold'}>
            2
          </Typography>
        </Stack>
      </Stack> */}

      <Box mt={3}>
        <Divider />
      </Box>

      <Box>
        <List>
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
                      color: 'white',
                      backgroundColor: (theme) =>
                        `${theme.palette.primary.main}!important`,
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ...(pathDirect === item.href && { color: 'white' }),
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
                            width: 'calc(100% - 32px)',
                            ...(pathDirect === subItem.href && {
                              color: 'white',
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
              cursor: 'pointer',
              mb: 1,
              color: '#000',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',

              ':hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
            to={'/login'}
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

export default UserSidebar;
