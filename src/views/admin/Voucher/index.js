import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import ApiService from '../../../api';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import dayjs from 'dayjs';
import MaterialReactTable from 'material-react-table';

const Voucher = () => {
  const userData = JSON.parse(localStorage.getItem('user-info'));
  const [userList, setUserList] = useState([]);
  const [voucher, setVoucher] = useState({
    userId: '',
    userIdError: '',
    value: '',
    valueError: '',
    expiryDate: dayjs().add(1, 'day').format('MM/DD/YYYY'),
    expiryDateError: '',
  });
  const [voucherList, setVoucherList] = useState();
  const fetchUser = () => {
    ApiService.request(`/user/get-users`, 'get')
      .then((response) => {
        if (response.status === 200) {
          const listArray = [];
          if (response.data.length) {
            response.data.map((item) => {
              if (item?.role === 'Customer') {
                listArray.push(item);
              }
            });
          }
          setUserList(listArray);
        }
      })
      .catch((err) => {});
  };
  const fetchVoucher = () => {
    ApiService.request(`/voucher/get-all-vouchers`, 'get')
      .then((response) => {
        if (response.status === 200) {
          setVoucherList(response?.data);
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    fetchUser();
    fetchVoucher();
    return () => {};
  }, []);
  const handleChange = (name, value) => {
    let newState = { ...voucher };
    newState[name] = value;
    console.log('first', { ...newState, [`${name}Error`]: '' });
    setVoucher({ ...newState, [`${name}Error`]: '' });
  };
  const customValidation = () => {
    let newState = { ...voucher };
    if (newState.userId === '') {
      newState.userIdError = 'Please select customer';
    } else {
      newState.userIdError = '';
    }
    if (newState.value === '') {
      newState.valueError = 'Please enter value';
    } else {
      newState.valueError = '';
    }
    if (newState.expiryDate === '') {
      newState.expiryDateError = 'Please enter expiry Date';
    } else {
      newState.expiryDateError = '';
    }
    setVoucher(newState);
  };
  const generateRandomCode = (length) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };
  const generateBill = () => {
    let newState = { ...voucher };
    customValidation();
    if (newState.userId && newState.value && newState.expiryDate) {
      ApiService.request('/voucher/add-voucher', 'post', {
        userId: voucher?.userId,
        code: generateRandomCode(6),
        value: voucher?.value,
        expiryDate: voucher.expiryDate,
      })
        .then((response) => {
          if (response.status === 200) {
            fetchVoucher();
            setVoucher({
              userId: '',
              userIdError: '',
              value: '',
              valueError: '',
              expiryDate: dayjs().format('MM/DD/YYYY'),
              expiryDateError: '',
            });
            toast.success('Voucher Added Successfully');
          }
        })
        .catch((err) => {});
    }
  };
  const columns = useMemo(
    () => [
      {
        header: 'UserId',
        accessorKey: 'userId',
        Cell: ({ row }) => <>{row?.original?.userId}</>,
      },
      {
        header: 'Voucher Code',
        accessorKey: 'code',
        Cell: ({ row }) => <>{row?.original?.code}</>,
      },
      {
        header: 'Value',
        accessorKey: 'value',
        Cell: ({ row }) => <>{row?.original?.value}</>,
      },
      {
        header: 'Expiry date',
        Cell: ({ row }) => <>{row?.original?.expiryDate}</>,
      },
    ],
    []
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h1" fontWeight={'bold'} color={'primary'}>
          Voucher
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={generateBill}
          >
            Generate
          </Button>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={3} justifyContent={'center'}>
              <Grid item xs={12} sm={6} lg={3}>
                <InputLabel>Customer</InputLabel>
                <FormControl
                  variant="outlined"
                  fullWidth
                  error={!!voucher.userIdError}
                >
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-error"
                    value={voucher.userId}
                    input={<OutlinedInput />}
                    onChange={(e) => handleChange('userId', e.target.value)}
                  >
                    <MenuItem disabled value="">
                      <em>Select Customer</em>
                    </MenuItem>
                    {userList.length &&
                      userList.map((item) => (
                        <MenuItem value={item.id}>
                          {item?.firstName} {item?.lastName}
                        </MenuItem>
                      ))}
                  </Select>
                  {voucher.userIdError && (
                    <FormHelperText>{voucher.userIdError}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <InputLabel>Value</InputLabel>
                <TextField
                  type="number"
                  fullWidth
                  helperText={voucher.valueError}
                  error={voucher.valueError}
                  placeholder="Ex:  20"
                  value={voucher.value}
                  onChange={(e) => handleChange('value', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <InputLabel>Expired Date</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      minDate={dayjs().add(1, 'day')}
                      value={dayjs(voucher.expiryDate)}
                      slotProps={{
                        textField: {
                          helperText: '',
                        },
                      }}
                      helperText="This is an error message"
                      onChange={(value) => {
                        handleChange(
                          'expiredDate',
                          dayjs(value.$d).format('DD/MM/YYYY')
                        );
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Box
              sx={{
                overflow: 'auto',
              }}
            >
              <MaterialReactTable
                columns={columns}
                data={voucherList || []}
                positionActionsColumn="last"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Voucher;
