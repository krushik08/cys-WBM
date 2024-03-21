import DownloadIcon from '@mui/icons-material/Download';
import {
  Box,
  Grid,
  Stack,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import MonthlyConsumptionPattern from './components/MonthlyConsumptionPattern';
import NumberOfCompletePayments from './components/NumberOfCompletePayments';
import api from '../../../api';
import moment from 'moment';
import { Volcano } from '@mui/icons-material';
import toast from 'react-hot-toast';
import BillingPayment from './components/BillingPayment';
import ApiService from '../../../api';

const Billing = () => {
  const theme = useTheme();
  const userData = JSON.parse(localStorage.getItem('user-info'));

  const [billingData, setBillingData] = React.useState();
  const [voucherData, setVoucherData] = React.useState();
  const [amountError, setAmountError] = React.useState();
  const [isPaymentModelOpen, setIsPaymentModelOpen] = React.useState(false);
  const [amount, setAmount] = React.useState();
  const [selectedVoucher, setSelectedVoucher] = React.useState();
  const fetchBill = () => {
    ApiService.request(`/payment/get-bill/${userData?.id}`, 'get')
      .then((response) => {
        if (response.status === 200) {
          setBillingData(response.data);
          setAmount(response.data?.amount);
        }
      })
      .catch((err) => {});
  };
  const fetchVoucher = () => {
    ApiService.request(`/payment/get-voucher/${userData?.id}`, 'get')
      .then((response) => {
        if (response.status === 200) {
          setVoucherData(response.data);
        }
      })
      .catch((err) => {});
  };
  React.useEffect(() => {
    fetchBill();
    return () => {};
  }, []);
  React.useEffect(() => {
    if (billingData?.billingId) {
      fetchVoucher();
    }
  }, [billingData]);
  const handelPay = () => {
    setIsPaymentModelOpen(true);
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Card sx={{ maxWidth: 960, m: 'auto' }}>
            <CardHeader
              title="Billing statement"
              // subheader="Your billing statement for June 2023"
            />
            <Divider />
            <CardContent>
              {billingData?.billingId ? (
                <Grid container justifyContent={'space-between'}>
                  <Grid item xs={6}>
                    <Stack direction={'column'} gap={2.5}>
                      <Typography
                        variant="h5"
                        fontWeight={'bold'}
                        color="primary"
                      >
                        Consumer Information
                      </Typography>

                      <Stack direction={'row'} gap={1.5}>
                        <Typography variant="body1">#ID Number:</Typography>
                        <Typography
                          variant="body1"
                          fontWeight={'bold'}
                          color="primary"
                        >
                          {userData.id}
                        </Typography>
                      </Stack>

                      <Stack direction={'row'} gap={1.5}>
                        <Typography variant="body1">First Name:</Typography>
                        <Typography
                          variant="body1"
                          fontWeight={'bold'}
                          color="primary"
                        >
                          {userData?.firstName}
                        </Typography>
                      </Stack>

                      <Stack direction={'row'} gap={1.5}>
                        <Typography variant="body1">Last Name:</Typography>
                        <Typography
                          variant="body1"
                          fontWeight={'bold'}
                          color="primary"
                        >
                          {userData?.lastName}
                        </Typography>
                      </Stack>

                      <Stack direction={'row'} gap={1.5}>
                        <Typography variant="body1">Email Address:</Typography>
                        <Typography
                          variant="body1"
                          fontWeight={'bold'}
                          color="primary"
                        >
                          {userData?.email}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack
                      direction={'column'}
                      gap={2.5}
                      alignItems={'flex-end'}
                    >
                      <Stack direction={'row'} gap={1.5}>
                        <Typography variant="body1">
                          Billing Statement No:
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={'bold'}
                          color="primary"
                        >
                          {billingData?.billingId}
                        </Typography>
                      </Stack>

                      <Stack direction={'row'} gap={1.5}>
                        <Typography variant="body1">Due Date:</Typography>
                        <Typography
                          variant="body1"
                          fontWeight={'bold'}
                          color="primary"
                        >
                          {billingData?.dueDate &&
                            moment(billingData?.dueDate).format(
                              'MMMM DD, YYYY'
                            )}
                        </Typography>
                      </Stack>

                      <Stack direction={'row'} gap={1.5}>
                        <Typography variant="body1">Amount Paid:</Typography>
                        <Typography
                          variant="body1"
                          fontWeight={'bold'}
                          color="primary"
                        >
                          {billingData?.amount}
                        </Typography>
                      </Stack>
                      <Stack direction={'row'} gap={1.5}>
                        <Typography variant="body1">Reading:</Typography>
                        <Typography
                          variant="body1"
                          fontWeight={'bold'}
                          color="primary"
                        >
                          {billingData?.waterConsumption}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>

                  <Grid item xs={12}>
                    <Box display={'flex'} justifyContent={'flex-end'} mt={3}>
                      <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        type="submit"
                        onClick={handelPay}
                      >
                        Pay Now
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  container
                  justifyContent={'center'}
                  alignItems={'center'}
                  sx={{ height: '40vh' }}
                >
                  <Grid item>
                    <Typography
                      variant="h1"
                      fontWeight={'bold'}
                      color={'secondary'}
                      textAlign={'center'}
                    >
                      Nothing to Pay Here...
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <BillingPayment
        open={isPaymentModelOpen}
        selectedVoucher={selectedVoucher}
        voucherData={voucherData}
        setSelectedVoucher={setSelectedVoucher}
        amountError={amountError}
        setAmount={setAmount}
        amount={amount}
        setAmountError={setAmountError}
        billingData={billingData}
        setIsPaymentModelOpen={setIsPaymentModelOpen}
      />
    </>
  );
};

export default Billing;
