import React, { useEffect, useState } from "react";
import {
  experimentalStyled,
  useMediaQuery,
  Container,
  Box,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import UserSidebar from "./Sidebar/UserSidebar";
import Footer from "./Footer/Footer";
import { TopbarHeight } from "../../assets/global/Theme-variable";

const MainWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));
const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: TopbarHeight,
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const UserLayout = () => {
  //
  const navigate = useNavigate()
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
   const userData = JSON.parse(localStorage.getItem('user-info'));
   useEffect(() => {
     if (!userData) {
       navigate('/login');
     }
   }, []);

  return (
    <MainWrapper>
      <Header
        sx={{
          paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
          backgroundColor: "#ffffff",
        }}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
      />

      <UserSidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />

      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "40px",
            paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            <Outlet />
          </Box>
          <Footer />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default UserLayout;
