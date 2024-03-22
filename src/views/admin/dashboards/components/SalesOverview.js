import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Chart from 'react-apexcharts';
import ApiService from '../../../../api';

const SalesOverview = () => {
  const [serialEarning, setSerialEarning] = useState([]);
  const [serialConsumption, setSerialConsumption] = useState([]);
  const [serialDate, setSerialDate] = useState([]);
  const fetchStatics = () => {
    ApiService.request(`/stats/get-one-year-stats`, 'get')
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length) {
            const earnings = [];
            const consumptions = [];
            const date = [];
            response.data.map((item) => {
              earnings.push(item.earnings);
              consumptions.push(item.waterConsumption);
              date.push(item.date);
            });
            setSerialEarning(earnings);
            setSerialConsumption(consumptions);
            setSerialDate(date);
          }
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    fetchStatics();
    return () => {};
  }, []);
  const optionssalesoverview = {
    grid: {
      show: true,
      borderColor: 'transparent',
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '42%',
        endingShape: 'rounded',
        borderRadius: 5,
      },
    },

    colors: ['#1e4db7', '#a7e3f4'],
    fill: {
      type: 'solid',
      opacity: 1,
    },
    chart: {
      offsetX: -15,
      toolbar: {
        show: false,
      },
      foreColor: '#adb0bb',
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: 'category',
      categories: serialDate,
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      show: true,
      min: 1,
      max: 400,
      tickAmount: 3,
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: 'butt',
      colors: ['transparent'],
    },
    tooltip: {
      theme: 'dark',
    },
  };
  const seriessalesoverview = [
    {
      name: 'Earnings',
      data: serialEarning,
    },
    {
      name: 'Water Consumption',
      data: serialConsumption,
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
              sx={{
                marginBottom: '0',
              }}
              gutterBottom
            >
              Overview
            </Typography>
          </Box>
          <Box
            sx={{
              marginLeft: 'auto',
              display: 'flex',
              mt: {
                lg: 0,
                xs: 2,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'secondary.main',
                  borderRadius: '50%',
                  height: 8,
                  width: 8,
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: 'secondary.main',
                }}
              >
                Water Consumption
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '10px',
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'primary.main',
                  borderRadius: '50%',
                  height: 8,
                  width: 8,
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: 'primary.main',
                }}
              >
                Earnings
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: '25px',
          }}
        >
          <Chart
            options={optionssalesoverview}
            series={seriessalesoverview}
            type="bar"
            height="295px"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesOverview;
