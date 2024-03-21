import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

import AccountCircleTwoTone from "@mui/icons-material/AccountCircleTwoTone";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";

import CollectionHistory from "./components/CollectionHistory";
import HoverDataCard from "../../../../components/Common/HoverDataCard";
import PaymentHistory from "./components/PaymentHistory";

import RevenueCard from "../monethlyReport/components/RevenueCard";
import HomeownersCollectionMo from "../monethlyReport/components/HomeownersCollectionMo";
import WaterConsumptionMo from "../monethlyReport/components/WaterConsumptionMo";
import UserCard from "../../../../components/Common/UserCard";
import MonthlyConsumptionPattern from "./components/MonthlyConsumptionPattern";
import MonthlyCollectionDues from "./components/MonthlyCollectionDues";

//
const person = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
];

const UserReport = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack direction={"row"} gap={2}>
                <Typography variant="h1" fontWeight={"bold"} color={"primary"}>
                  User Report
                </Typography>

                <Box>
                  <Autocomplete
                    disablePortal
                    id="medium-combo-box-demo"
                    options={person}
                    fullWidth
                    sx={{ minWidth: 250 }}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} label="" hiddenLabel />
                    )}
                  />
                </Box>
              </Stack>

              <Grid container mt={2}>
                <Grid item xs={12} lg={3}>
                  <HoverDataCard title="User Name" primary={"Ellyes Perry"} />
                </Grid>
                <Grid item xs={12} lg={3}>
                  <HoverDataCard title="ID Number" primary={"1025"} />
                </Grid>
                <Grid item xs={12} lg={3}>
                  <HoverDataCard title="Block" primary={"1"} />
                </Grid>
                <Grid item xs={12} lg={3}>
                  <HoverDataCard title="Lot" primary={"4"} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <UserCard
            primary="Consumption"
            secondary="11"
            content1="Current Water Bill"
            content2="Php 167.25"
            color={theme.palette.success.dark}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <UserCard
            primary="Collection Due"
            secondary="Php 600"
            content1="Balance"
            content2="Php 0"
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <UserCard
            primary="Total Amount Due"
            secondary="Php 767.25"
            content1="Current Bill Period"
            content2="Dec 2020"
            color={theme.palette.danger.main}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <MonthlyConsumptionPattern />
        </Grid>

        <Grid item xs={12} lg={6}>
          <MonthlyCollectionDues />
        </Grid>

        <Grid item xs={12} lg={6}>
          <PaymentHistory />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CollectionHistory />
        </Grid>
      </Grid>
    </>
  );
};

export default UserReport;
