import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Chart from 'react-apexcharts';
import ApiService from '../../../../api';

const MonthlyConsumptionPattern = () => {
  const [staticData, setStaticData] = useState([]);
  const [dateList, setDateList] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user-info'));
  const fetchConsumption = () => {
    ApiService.request(
      `/stats/get-last-two-months-consumption/${userData.id}`,
      'get'
    )
      .then((response) => {
        const dates = [];
        const staticDataList = [];
        if (response.status === 200) {
          if (response?.data?.length) {
            response?.data.map((item) => {
              staticDataList.push(item?.reading);
              dates.push(item?.date);
            });
            setStaticData(staticDataList);
            setDateList(dates);
          }
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    fetchConsumption();
  }, []);
  const optionsMonthlyConsumptionPattern = {
    colors: ['#39cb7f'],

    options: {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'category',
        categories: dateList,
        labels: {
          style: {
            cssClass: 'grey--text lighten-2--text fill-color',
          },
        },
      },
    },

    tooltip: {
      theme: 'dark',
    },
  };
  const seriessalesoverview = [
    {
      name: 'Consumption',
      data: staticData,
    },
  ];

  return (
    <Card
      variant="outlined"
      sx={{
        paddingBottom: '0',
      }}
    >
      <CardContent
        sx={{
          paddingBottom: '16px !important',
        }}
      >
        <Box
          sx={{
            display: {
              sm: 'flex',
              xs: 'block',
            },
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              variant="h3"
              fontWeight={'bold'}
              sx={{
                marginBottom: '0',
              }}
              gutterBottom
            >
              Monthly Consumption Pattern
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: '24px',
          }}
        >
          <Chart
            options={optionsMonthlyConsumptionPattern}
            series={seriessalesoverview}
            type="area"
            height="295px"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthlyConsumptionPattern;
