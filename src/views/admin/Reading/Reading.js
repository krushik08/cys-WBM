import {
  Button,
  Card,
  CardContent,
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
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ApiService from '../../../api';

const Reading = () => {
  const [userList, setUserList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedCustomerError, setSelectedCustomerError] = useState('');
  const [reading, setReading] = useState('');
  const [readingError, setReadingError] = useState('');
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
  useEffect(() => {
    fetchUser();
    return () => {};
  }, []);
  const handleChangeCustomer = (e) => {
    setSelectedCustomerError('');
    setSelectedCustomer(e.target.value);
  };
  const customValidation = () => {
    if (reading === '') {
      setReadingError('Reading is required');
    } else {
      setReadingError('');
    }
    if (selectedCustomer === '') {
      setSelectedCustomerError('Customer is missing');
    } else {
      setSelectedCustomerError('');
    }
  };
  const generateBill = () => {
    customValidation();
    if (!readingError && !selectedCustomerError) {
      ApiService.request('/stats/add-usage', 'post', {
        meter: {
          user: {
            id: selectedCustomer,
          },
        },
        reading: reading,
      })
        .then((response) => {
          if (response.status === 200) {
            setSelectedCustomer('');
            setReading('');
            toast.success('Reading Added Successfully');
          }
        })
        .catch((err) => {});
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h1" fontWeight={'bold'} color={'primary'}>
          Reading
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
                  error={!!selectedCustomerError}
                >
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-error"
                    value={selectedCustomer}
                    input={<OutlinedInput />}
                    onChange={handleChangeCustomer}
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
                  {selectedCustomerError && (
                    <FormHelperText>{selectedCustomerError}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <InputLabel>Reading</InputLabel>
                <TextField
                  type="number"
                  fullWidth
                  helperText={readingError}
                  error={readingError}
                  placeholder="Ex:  20"
                  value={reading}
                  onChange={(e) => {
                    setReading(e.target.value);
                    setReadingError();
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Reading;
