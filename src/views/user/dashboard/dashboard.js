import { Grid, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserCard from "../../../components/Common/UserCard";
import PaymentHistory from "./components/PaymentHistory";
import CollectionHistory from "./components/CollectionHistory";
import MonthlyConsumptionPattern from "./components/MonthlyConsumptionPattern";
import MonthlyCollectionDues from "./components/MonthlyCollectionDues";
import api from "../../../api";
import moment from "moment";
import ApiService from "../../../api";

const Dashboard = () => {
  const userData = JSON.parse(localStorage.getItem('user-info'));
  const [consumeData,setConsumeData] = useState()
  const [billingData, setBillingData] = useState();
  

  const fetchConsumeData = async() => {
   await ApiService.request(`/stats/get-consumption/${userData?.id}`, 'get')
     .then((response) => {
       if (response.status === 200) {
         setConsumeData(response?.data);
       }
     })
     .catch((err) => {});
  };
  const fetchBillingData = async() => {
   await ApiService.request(`/payment/get-bill/${userData?.id}`, 'get')
     .then((response) => {
       if (response.status === 200) {
         setBillingData(response?.data);
       }
     })
     .catch((err) => {});
  };
  useEffect(()=>{
fetchConsumeData();
fetchBillingData();
  },[])
  

  const theme = useTheme();
  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={4}>
          <UserCard
            primary="Consumption"
            secondary={billingData?.waterConsumption}
            content1="Current Water Bill"
            content2={billingData?.amount}
            color={theme.palette.success.dark}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <UserCard
            primary="Connection Due"
            secondary={consumeData?.date}
            content1="Reading"
            content2={consumeData?.reading}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <UserCard
            primary="Total Amount Due"
            secondary={billingData?.amount}
            content1="Current Bill Period"
            content2={moment(billingData?.dueDate).format('MMM YYYY')}
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

export default Dashboard;
