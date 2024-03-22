import {
  Box,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ApiService from '../../../../api';

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user-info'));
  const fetchPaymentHistory = () => {
    ApiService.request(
      `/payment/get-transactions-history-by-id/${userData?.id}`,
      'get'
    )
      .then((response) => {
        if (response.status === 200) {
          setPaymentHistory(response.data);
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    fetchPaymentHistory();
    return () => {};
  }, []);
  return (
    <Card variant="outlined">
      <CardContent>
        <Box
          sx={{
            display: {
              sm: 'flex',
              xs: 'block',
            },
            alignItems: 'flex-start',
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
              Payment History
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            overflow: 'auto',
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              mt: 3,
              whiteSpace: 'nowrap',
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
                    Water Consumption
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="textSecondary" variant="h6">
                    Status
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="textSecondary" variant="h6">
                    Amount
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentHistory.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                      }}
                    >
                      {payment.paymentId}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {payment.waterConsumption}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      sx={{
                        pl: '4px',
                        pr: '4px',
                        backgroundColor: payment.billPaidDate ? 'green' : 'red',
                        color: '#fff',
                      }}
                      size="small"
                      label={payment.billPaidDate ? 'Paid' : 'Not Paid'}
                    ></Chip>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">{payment.billAmount}</Typography>
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
