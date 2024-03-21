import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";

const MonthlyCollectionDues = () => {
  const optionsMonthlyCollectionDues = {
    colors: ["#39cb7f", "#fc4b6c"],

    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
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
    },

    tooltip: {
      theme: "dark",
    },
  };
  const seriessalesoverview = [
    {
      name: "Earnings",
      data: [355, 390, 300, 350, 390, 180, 355, 390, 300, 350, 390],
    },
    {
      name: "Un-paid",
      data: [280, 250, 325, 215, 250, 310, 280, 250, 325, 215, 250],
    },
  ];

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
              Monthly Collection Dues
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "24px",
          }}
        >
          <Chart
            options={optionsMonthlyCollectionDues}
            series={seriessalesoverview}
            type="area"
            height="295px"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthlyCollectionDues;
