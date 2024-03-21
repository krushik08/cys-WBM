import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import AccountCircleTwoTone from "@mui/icons-material/AccountCircleTwoTone";

import RevenueCard from "./components/RevenueCard";
import WaterConsumptionMo from "./components/WaterConsumptionMo";
import HomeownersCollectionMo from "./components/HomeownersCollectionMo";
import MonthlyReportTable from "./components/MonthlyReportTable";

const MonethlyReport = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1" fontWeight={"bold"} color={"primary"}>
            Monthly Report
          </Typography>
        </Grid>

        <Grid item xs={12} lg={3}>
          <RevenueCard
            primary="Total Earnings"
            secondary="$42,562"
            iconPrimary={MonetizationOnTwoToneIcon}
            color={theme.palette.success.dark}
          />
        </Grid>
        <Grid item xs={12} lg={3}>
          <RevenueCard
            primary="Orders Received"
            secondary="486"
            iconPrimary={AccountCircleTwoTone}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} lg={3}>
          <RevenueCard
            primary="This Month"
            secondary="6054"
            content="+12%"
            txtColor={theme.palette.success.main}
            iconPrimary={AccountCircleTwoTone}
            color={theme.palette.secondary.main}
          />
        </Grid>
        <Grid item xs={12} lg={3}>
          <RevenueCard
            primary="Last Month"
            secondary="486"
            content="-12%"
            txtColor={theme.palette.error.main}
            iconPrimary={AccountCircleTwoTone}
            color={theme.palette.warning.main}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <WaterConsumptionMo />
        </Grid>

        <Grid item xs={12} lg={6}>
          <HomeownersCollectionMo />
        </Grid>

        <Grid item xs={12}>
          <MonthlyReportTable />
        </Grid>
      </Grid>
    </>
  );
};

export default MonethlyReport;
