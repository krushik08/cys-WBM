import PropTypes from 'prop-types';

// material-ui
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import api from '../../../../api';
import moment from 'moment';
import toast from 'react-hot-toast';
import ApiService from '../../../../api';


export default function BillingPayment({
  title,
  open,
  handleClose,
  handleConfirmed,
  selectedVoucher,
  setSelectedVoucher,
  voucherData,
  amountError,
  amount,
  setAmountError,
  setAmount,
  setIsPaymentModelOpen,
  billingData,
}) {
  const userData = JSON.parse(localStorage.getItem('user-info'));
  const handlePay = () => {
    let amountErrorDetail = '';
    if (amountError === '') {
      amountErrorDetail = 'Amount is required';
    } else {
      amountErrorDetail = '';
    }
    setAmountError(amountErrorDetail);
    if (!amountErrorDetail) {
      ApiService.request(`/payment/pay-bill`, 'post', {
        userId: userData.id,
        code: selectedVoucher,
        value: amount,
        expiryDate: moment(billingData?.dueDate).format('DD/MM/YYYY'),
        used: selectedVoucher === voucherData.code ? 'true' : 'false',
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success('Payment Success');
            setIsPaymentModelOpen();
          }
        })
        .catch((err) => {});
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      keepMounted
      maxWidth="400"
      aria-labelledby="item-delete-title"
      aria-describedby="item-delete-description"
    >
      {open && (
        <>
          <DialogTitle id="item-delete-title">
            <Typography
              variant="h2"
              textAlign={'center'}
              color={'secondary'}
              fontWeight={'bold'}
            >
              Pay Bill
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Grid container mb={2}>
              <Grid item>
                {' '}
                <Typography variant="h5" fontWeight={'bold'} color="primary">
                  Voucher Details
                </Typography>
                <Grid
                  container
                  justifyContent={'space-between'}
                  spacing={1}
                  mt={2}
                >
                  <Grid item xs={6}>
                    <Stack direction={'row'} gap={1}>
                      <Typography variant="subtitle2">Code:</Typography>
                      <Typography
                        variant="subtitle2"
                        fontWeight={'bold'}
                        color="primary"
                      >
                        {voucherData?.code}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction={'row'} gap={1}>
                      <Typography variant="subtitle2">Expiry Date:</Typography>

                      <Typography
                        variant="subtitle2"
                        fontWeight={'bold'}
                        color="primary"
                      >
                        {voucherData?.expiryDate}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction={'row'} gap={1}>
                      <Typography variant="subtitle2">Value :</Typography>

                      <Typography
                        variant="subtitle2"
                        fontWeight={'bold'}
                        color="primary"
                      >
                        {voucherData?.value}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack direction={'row'} gap={1}>
                      <Typography variant="subtitle2">
                        Voucher Is Used:
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        fontWeight={'bold'}
                        color="primary"
                      >
                        {voucherData?.used ? 'Used' : 'Not Used '}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <Grid container justifyContent={'space-between'} spacing={2} mt={1}>
              <Grid item xs={6}>
                <Stack direction={'column'} gap={1}>
                  <Typography variant="body1">Voucher:</Typography>
                  <Typography
                    variant="body1"
                    fontWeight={'bold'}
                    color="primary"
                  >
                    <TextField
                      fullWidth
                      placeholder="Ex: IUIUID"
                      value={selectedVoucher}
                      onChange={(e) => {
                        if (e.target.value === voucherData.code) {
                          // setAmount(
                          //   parseInt(billingData.amount || 0) -
                          //     parseInt(voucherData.value || 0)
                          // );
                        }
                        setSelectedVoucher(e.target.value);
                      }}
                    />
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction={'column'} gap={1}>
                  <Typography variant="body1">Amount:</Typography>
                  <TextField
                    fullWidth
                    placeholder="Ex: 200"
                    helperText={amountError}
                    error={amountError}
                    value={amount}
                    onChange={(e) => {
                      setAmountError('');
                      setAmount(e.target.value);
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>{' '}
          </DialogContent>

          <DialogActions sx={{ mr: 2 }}>
            <Button
              onClick={() => setIsPaymentModelOpen(false)}
              color="error"
              size="large"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={handlePay}
              autoFocus
              color="secondary"
            >
              Pay Now
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

BillingPayment.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
};
