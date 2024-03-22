import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  useTheme,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import * as React from 'react';

import MuiAccordion from '@mui/material/Accordion';
import ApiService from '../../../api';
import BillingPayment from './components/BillingPayment';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '4px',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const Billing = () => {
  const theme = useTheme();
  const userData = JSON.parse(localStorage.getItem('user-info'));

  const [billingData, setBillingData] = React.useState();
  const [voucherData, setVoucherData] = React.useState([]);
  const [amountError, setAmountError] = React.useState();
  const [isOpen, setIsOpen] = React.useState(false);
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
    ApiService.request(`/voucher/get-vouchers/${userData?.id}`, 'get')
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
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography
                          variant="h5"
                          fontWeight={'bold'}
                          color="primary"
                        >
                          Voucher Details
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container>
                          <Grid item xs={12}>
                            <Box>
                              <Table
                                aria-label="simple table"
                                sx={{
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell>
                                      <Typography
                                        color="textSecondary"
                                        variant="h6"
                                      >
                                        Id
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography
                                        color="textSecondary"
                                        variant="h6"
                                      >
                                        Code
                                      </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                      <Typography
                                        color="textSecondary"
                                        variant="h6"
                                      >
                                        Value
                                      </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                      <Typography
                                        color="textSecondary"
                                        variant="h6"
                                      >
                                        Expiry Date
                                      </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                      <Typography
                                        color="textSecondary"
                                        variant="h6"
                                      >
                                        Apply This
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {voucherData.map((voucher) => (
                                    <TableRow key={voucher.name}>
                                      <TableCell>
                                        <Typography
                                          sx={{
                                            fontSize: '15px',
                                            fontWeight: '500',
                                          }}
                                        >
                                          {voucher.id}
                                        </Typography>
                                      </TableCell>

                                      <TableCell>
                                        <Typography
                                          color="textSecondary"
                                          variant="h6"
                                        >
                                          {voucher.code}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          color="textSecondary"
                                          variant="h6"
                                        >
                                          {voucher.value}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography
                                          color="textSecondary"
                                          variant="h6"
                                        >
                                          {voucher.expiryDate}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="center">
                                        <Button
                                          disabled={
                                            voucher.value >= billingData.amount
                                          }
                                          variant="outlined"
                                          sx={{
                                            boxShadow: 'none',
                                          }}
                                          size="small"
                                          onClick={() =>
                                            setSelectedVoucher(voucher)
                                          }
                                        >
                                          {selectedVoucher?.code ===
                                          voucher?.code
                                            ? 'Applied'
                                            : 'Apply'}
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Box>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  <Grid
                    container
                    justifyContent={'flex-end'}
                    spacing={2}
                    mt={1}
                  >
                    <Grid item xs={8} />
                    <Grid item xs={4}>
                      <Stack direction={'column'} gap={1}>
                        <Stack
                          direction={'row'}
                          gap={1}
                          justifyContent={'flex-end'}
                        >
                          <Typography variant="body1">Amount:</Typography>
                          <Typography
                            variant="body1"
                            color={'primary'}
                            fontWeight={'bold'}
                          >
                            {billingData?.amount}
                          </Typography>
                        </Stack>
                        <Stack
                          direction={'row'}
                          gap={1}
                          justifyContent={'flex-end'}
                        >
                          <Typography variant="body1">
                            Discount Amount:
                          </Typography>
                          <Typography
                            variant="body1"
                            color={'primary'}
                            fontWeight={'bold'}
                          >
                            {selectedVoucher?.value || 0}
                          </Typography>
                        </Stack>

                        <Divider />
                        <Stack
                          direction={'row'}
                          gap={1}
                          justifyContent={'flex-end'}
                        >
                          <Typography variant="body1">Total Amount:</Typography>
                          <Typography
                            variant="body1"
                            color={'primary'}
                            fontWeight={'bold'}
                          >
                            {billingData?.amount - selectedVoucher?.value || 0}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>{' '}
                  <Grid item xs={12}>
                    <Box display={'flex'} justifyContent={'flex-end'} mt={3}>
                      <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        type="submit"
                        onClick={() => setIsOpen(true)}
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
                      No Outstanding Bill Found
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <BillingPayment
        open={isOpen}
        voucher={selectedVoucher}
        selectedVouch={selectedVoucher}
        voucherData={voucherData}
        amountError={amountError}
        setAmountError={setAmountError}
        handleClose={() => setIsOpen(false)}
        fetchBill={fetchBill}
        amount={billingData?.amount - selectedVoucher?.value || 0}
      />
    </>
  );
};

export default Billing;
