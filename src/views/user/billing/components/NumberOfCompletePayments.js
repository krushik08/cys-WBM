import { Box, Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";

const NumberOfCompletePayments = () => {
  const chartData = {
    height: 80,
    type: "bar",
    options: {
      chart: {
        id: "percentage-chart",
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "55%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      xaxis: {
        categories: ["Desktop", "Mobile", "Tablet", "Laptop"],
      },
    },
    series: [
      {
        name: "Requests",
        data: [66.6, 29.7, 32.8, 50],
      },
    ],
  };

  return (
    <Box p={2}>
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
            Number of Complete Payments: <b>23</b>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NumberOfCompletePayments;
