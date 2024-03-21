import {
  Box,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
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

const MonthlyReportTable = () => {
  const [age, setAge] = React.useState("10");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
              Product Performance
            </Typography>
          </Box>

          <Box
            sx={{
              marginLeft: "auto",
              mt: {
                lg: 0,
                xs: 2,
              },
            }}
          >
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>2021</MenuItem>
                <MenuItem value={20}>2022</MenuItem>
                <MenuItem value={30}>2023</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            overflow: "auto",
            mt: 3,
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
                <TableCell align="center" colSpan={1}></TableCell>
                <TableCell align="center" colSpan={1}></TableCell>
                <TableCell align="center" colSpan={1}>
                  Water Consumption
                </TableCell>
                <TableCell align="center" colSpan={1}>
                  Homeowners Collection
                </TableCell>
              </TableRow>
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

export default MonthlyReportTable;
