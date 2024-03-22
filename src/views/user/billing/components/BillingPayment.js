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
  open,
  fetchBill,
  handleClose,
  voucher,
  amount,
}) {
  const userData = JSON.parse(localStorage.getItem('user-info'));
  const handlePay = (e) => {
    ApiService.request(`/payment/pay-bill`, 'post', {
      voucherCode: voucher?.code || '',
      userId: userData?.id,
      outstandingAmount: amount,
    })
      .then((response) => {
        if (response.status === 200) {
          fetchBill();
          toast.success(response.data.message);
          handleClose();
        }
      })
      .catch((err) => {});
  };
  return (
    <Dialog
      open={open}
      onClick={handleClose}
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
              Pay Bill!
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Grid
              container9913221916
              sx={{ width: '320px' }}
              justifyContent={'center'}
            >
              <Grid item>
                {' '}
                <Typography variant="h5" fontWeight={'bold'} color="primary">
                  Are you sure you want to pay this bill?
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ mr: 2 }}>
            <Button
              onClick={handleClose}
              color="error"
              size="large"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="contained"
              size="large"
              onClick={handlePay}
              autoFocus
              color="secondary"
            >
              Go!
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
