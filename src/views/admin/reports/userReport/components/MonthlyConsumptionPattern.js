import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";

const MonthlyConsumptionPattern = () => {
  const chartData = {
    height: 350,
    type: "area",
    options: {
      colors: ["#39cb7f", "#fc4b6c"],
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "category",
        categories: [
          "jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
        ],
      },
      tooltip: {
        theme: "dark",
      },
    },

    series: [
      {
        name: "Earnings",
        data: [355, 390, 300, 350, 390, 180, 355, 390, 300, 350, 390],
      },
      {
        name: "Un-paid",
        data: [280, 250, 325, 215, 250, 310, 280, 250, 325, 215, 250],
      },
    ],
  };

  return (
    <Card
      variant="outlined"
      sx={{
        paddingBottom: "0",
      }}
    >
      <CardContent
        sx={{
          paddingBottom: "16px !important",
        }}
      >
        <Box
          sx={{
            display: {
              sm: "flex",
              xs: "block",
            },
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              fontWeight={"bold"}
              sx={{
                marginBottom: "0",
              }}
              gutterBottom
            >
              Monthly Consumption Pattern
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "24px",
          }}
        >
          <Chart {...chartData} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthlyConsumptionPattern;
