import { Box, Grid } from "@mui/material";
import React from "react";
import Overview from "./components/Overview";
import SalesOverview from './components/SalesOverview';

const Dashboard = () => {
  // 2

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Overview />
        </Grid>
        <Grid item xs={12} lg={12}>
          <SalesOverview />
        </Grid>
     
      </Grid>
    </Box>
  );
};

export default Dashboard;
