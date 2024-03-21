import { Box, Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";

const MonthlyConsumptionPattern = () => {
  const chartData = {
    type: "area",
    height: 80,
    options: {
      chart: {
        id: "visit-chart",
        sparkline: {
          enabled: true,
        },
      },
      xaxis: {
        data: [
          "Jan",
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
          "Dec",
        ],
        labels: {
          show: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        opacity: 0.2,
      },
      markers: {
        size: 3,
        strokeWidth: 2,
        hover: {
          size: 6,
        },
      },

      yaxis: {
        labels: {
          show: false,
        },
      },
      stroke: {
        curve: "straight",
        width: 3,
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: () => "Consumption :",
          },
        },
        marker: {
          show: false,
        },
      },
    },
    series: [
      {
        name: "month",
        data: [9, 66, 41, 89, 63, 25, 44, 12, 36, 20, 54, 25],
      },
    ],
  };

  return (
    <Box p={2}>
      <Box
        sx={{
          display: {
            sm: "flex",
            xs: "block",
          },
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
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
          margin: "24px  0 12px 0",
        }}
      >
        <Chart {...chartData} />
      </Box>
      <Box
        sx={{
          display: {
            sm: "flex",
            xs: "block",
          },
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            // fontWeight={"bold"}
            sx={{
              marginBottom: "0",
            }}
            gutterBottom
          >
            Avagrage Consumption: <b>9</b>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MonthlyConsumptionPattern;
