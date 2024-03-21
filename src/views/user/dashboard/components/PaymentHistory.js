import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const products = [
  {
    id: "1",
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    priority: "Low",
    pbg: "primary.main",
    budget: "3.9",
  },
  {
    id: "2",
    name: "Andrew McDownland",
    post: "Project Manager",
    pname: "Real Homes WP Theme",
    priority: "Medium",
    pbg: "secondary.main",
    budget: "24.5",
  },
  {
    id: "3",
    name: "Christopher Jamil",
    post: "Project Manager",
    pname: "MedicalPro WP Theme",
    priority: "High",
    pbg: "error.main",
    budget: "12.8",
  },
  {
    id: "4",
    name: "Nirav Joshi",
    post: "Frontend Engineer",
    pname: "Hosting Press HTML",
    priority: "Critical",
    pbg: "success.main",
    budget: "2.4",
  },
];

const PaymentHistory = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box
          sx={{
            display: {
              sm: "flex",
              xs: "block",
            },
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                marginBottom: "0",
              }}
              gutterBottom
            >
              Payment History
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            overflow: "auto",
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              mt: 3,
              whiteSpace: "nowrap",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Month
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="textSecondary" variant="h6">
                    Earnings
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="textSecondary" variant="h6">
                    Earnings
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.name}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {product.id}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {product.pname}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">${product.budget}k</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">${product.budget}k</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
