import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast"
import logoicn from '../../assets/images/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [userCredential, setUserCredential] = useState({
    mobileNumber: '',
    mobileNumberState: null,
    password: '',
    passwordState: null,
  });
  useEffect(() => {
    localStorage.removeItem('user-info');
  }, []);
  const customValidation = () => {
    const newState = { ...userCredential };
    if (userCredential.mobileNumber === '') {
      newState['mobileNumberState'] = 'Mobile Number is required';
    }
    if (userCredential.password === '') {
      newState['passwordState'] = 'Password is required';
    }
    setUserCredential({ ...newState });
  };
  const handleSubmit = async (e, value) => {
    e.preventDefault();
    customValidation();
    if (!userCredential?.mobileNumberState && !userCredential?.passwordState) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/auth/signin`, {
          mobileNumber: userCredential.mobileNumber,
          password: userCredential.password,
        })
        .then((response) => {
          if (response) {
            localStorage.setItem('user-info', JSON.stringify(response.data));
            setTimeout(() => {
              if (response.data.role === 'Customer') {
                navigate('/u/dashboard');
              } else {
                navigate('/dashboard');
              }
            }, 200);
          }
        })
        .catch((err) => {
          if (err?.response?.status) {
            toast.error('unauthorized User');
          }
        });
    }
  };
  const handleChange = (name, value) => {
    const newState = { ...userCredential };
    newState[name] = value;
    setUserCredential({ ...newState, [`${name}State`]: '' });
  };

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={3}>
        <Card
          variant="outlined"
          sx={{
            p: 0,
          }}
        >
          <Box display="flex" alignItems="center">
            <Box flexGrow={1} display={'flex'} justifyContent={'center'}>
              <Box
                component={'img'}
                sx={{ width: '120px' }}
                alt="Logo"
                src={logoicn}
              />

              {/* <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                Login
              </Typography> */}
            </Box>
          </Box>
          <Divider />
          <CardContent
            sx={{
              padding: '30px',
            }}
          >
            <Box component={'form'} onSubmit={handleSubmit}>
              <Box>
                <InputLabel shrink sx={{ fontSize: '18px', fontWeight: '600' }}>
                  Mobile No.
                </InputLabel>
                <TextField
                  error={userCredential.mobileNumberState}
                  helperText={userCredential.mobileNumberState}
                  id="mobile-number"
                  hiddenLabel
                  type="number"
                  variant="outlined"
                  name="mobile"
                  onChange={(e) => handleChange('mobileNumber', e.target.value)}
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                />
              </Box>

              <Box>
                <InputLabel shrink sx={{ fontSize: '18px', fontWeight: '600' }}>
                  Password
                </InputLabel>
                <TextField
                  error={userCredential.passwordState}
                  helperText={userCredential.passwordState}
                  id="outlined-password-input"
                  hiddenLabel
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  onChange={(e) => handleChange('password', e.target.value)}
                  name="password"
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                />
              </Box>

              <Box mt={2}>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
