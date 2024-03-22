import {
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import ReceiptTwoToneIcon from "@mui/icons-material/ReceiptTwoTone";
import PaidTwoToneIcon from "@mui/icons-material/PaidTwoTone";
import PendingActionsTwoToneIcon from "@mui/icons-material/PendingActionsTwoTone";
import ApiService from "../../../../api";


const Overview = () => {
  const theme = useTheme();
  const [staticData,setStaticData] = useState()
  const matchDownXs = useMediaQuery(theme.breakpoints.down("sm"));
  const fetchStatic = ()=>{
     ApiService.request(`/stats/get-stats`,'get')
       .then((response) => {
        
         if (response.status === 200) {
           setStaticData(response.data);
         }
       })
       .catch((err) => {});
    
  }
  useEffect(()=>{
        fetchStatic()
        return ()=>{}

  },[])

  return (
    <Grid container>
      {/*  */}
      <Grid item xs={12} sm={3}>
        <Card variant="outlined">
          <CardContent>
            <Grid
              container
              alignItems="center"
              spacing={1}
              justifyContent={matchDownXs ? 'space-between' : 'center'}
            >
              <Grid item>
                <PeopleAltTwoToneIcon
                  sx={{ fontSize: 32, color: theme.palette.primary.main }}
                />
              </Grid>
              <Grid item sm zeroMinWidth>
                <Typography
                  variant="h4"
                  fontWeight={'bold'}
                  align="right"
                  color={'secondary'}
                >
                  {staticData?.totalCustomers}
                </Typography>
                <Typography variant="h5" align="right">
                  Total Customer
                </Typography>
              </Grid>
            </Grid>{' '}
          </CardContent>
        </Card>
      </Grid>

      {/*  */}
      <Grid item xs={12} sm={3}>
        <Card variant="outlined">
          <CardContent>
            <Grid
              container
              alignItems="center"
              spacing={1}
              justifyContent={matchDownXs ? 'space-between' : 'center'}
            >
              <Grid item>
                <ReceiptTwoToneIcon
                  sx={{ fontSize: 32, color: theme.palette.primary.main }}
                />
              </Grid>
              <Grid item sm zeroMinWidth>
                <Typography
                  variant="h4"
                  fontWeight={'bold'}
                  align="right"
                  color={'secondary'}
                >
                  {staticData?.totalWaterUsage}
                </Typography>
                <Typography variant="h5" align="right">
                  Total Usage
                </Typography>
              </Grid>
            </Grid>{' '}
          </CardContent>
        </Card>
      </Grid>

      {/*  */}
      <Grid item xs={12} sm={3}>
        <Card variant="outlined">
          <CardContent>
            <Grid
              container
              alignItems="center"
              spacing={1}
              justifyContent={matchDownXs ? 'space-between' : 'center'}
            >
              <Grid item>
                <PaidTwoToneIcon
                  sx={{ fontSize: 32, color: theme.palette.primary.main }}
                />
              </Grid>
              <Grid item sm zeroMinWidth>
                <Typography
                  variant="h4"
                  fontWeight={'bold'}
                  align="right"
                  color={'secondary'}
                >
                  {staticData?.totalEarnings}
                </Typography>
                <Typography variant="h5" align="right">
                  Total Earnings
                </Typography>
              </Grid>
            </Grid>{' '}
          </CardContent>
        </Card>
      </Grid>

      {/*  */}
      <Grid item xs={12} sm={3}>
        <Card variant="outlined">
          <CardContent>
            <Grid
              container
              alignItems="center"
              spacing={1}
              justifyContent={matchDownXs ? 'space-between' : 'center'}
            >
              <Grid item>
                <PendingActionsTwoToneIcon
                  sx={{ fontSize: 32, color: theme.palette.primary.main }}
                />
              </Grid>
              <Grid item sm zeroMinWidth>
                <Typography
                  variant="h4"
                  fontWeight={'bold'}
                  align="right"
                  color={'secondary'}
                >
                  {staticData?.totalPaymentPending || 0}
                </Typography>
                <Typography variant="h5" align="right">
                  Total Pending
                </Typography>
              </Grid>
            </Grid>{' '}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Overview;
