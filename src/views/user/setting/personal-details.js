import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import PersonAddAlt1TwoToneIcon from "@mui/icons-material/PersonAddAlt1TwoTone";
import api from "../../../api";
import toast from "react-hot-toast";
import ApiService from "../../../api";

const PersonalDetails = () => {
  const [userDetails, setUserDetails] = useState();
  const userData = JSON.parse(localStorage.getItem('user-info'));
  const fetchUserDetails = ()=>{
      
        ApiService.request(`/user/get-user/${userData?.id}`, 'get')
          .then((response) => {
            if (response.status === 200) {
              setUserDetails({
                ...response.data,
                firstNameState: null,
                lastNameState: null,
                emailState: null,
                mobileNumberState: null,
              });
            }
          })
          .catch((err) => {});
    
  }
  useEffect(()=>{
    fetchUserDetails()
    return ()=>{

    }
  },[])
  const customValidation = () => {
    let newState = { ...userDetails };
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newState.firstName === '') {
      newState['firstNameState'] = 'First name is required';
    } else {
      newState['firstNameState'] = null;
    }
    if (newState.lastName === '') {
      newState['lastNameState'] = 'Last name is required';
    } else {
      newState['lastNameState'] = null;
    }
    // if (newState.mobileNumber === '' || newState.mobileNumber?.length !== 10) {
    //   newState['mobileNumberState'] = 'Invalid mobile number';
    // } else {
    //   newState['mobileNumberState'] = null;
    // }
    if (newState.email === '' || !emailRegex.test(newState.email)) {
      newState['emailState'] = 'Invalid emil address';
    } else {
      newState['emailState'] = null;
    }
    setUserDetails({ ...newState });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    customValidation();
    
    if (
      !userDetails?.firstNameState &&
      !userDetails?.lastNameState &&
      !userDetails?.mobileNumberState &&
      !userDetails?.emailState
    ) {
      const token = JSON.parse(localStorage.getItem('user-info'))?.accessToken; // replace with your token
      if (userDetails?.id) {
       ApiService(`/user/update-user-details`,'get', userDetails, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              toast.success('profile Updated Successfully');
            }
          })
          .catch((err) => {
            if (err?.response?.status === 400) {
              if (err?.response?.data?.message) {
                toast.error(err?.response?.data?.message);
              } else {
                toast.error('unauthorized User');
              }
            }
          });
      };
      }

  };

  const handleChange = (name, value) => {
    setUserDetails({ ...userDetails, [name]: value, [`${name}State`]: '' });
  };
  return (
    <Grid container>
      <Grid item xs={12} mb={3}>
        <Typography variant="h2" fontWeight={'bold'} color={'primary'}>
          Personal Details
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Box
             component={'form'} onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} lg={4}>
                  <InputLabel>First Name</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Ex: Jhon"
                    value={userDetails?.firstName}
                    helperText={userDetails?.firstNameState}
                    error={userDetails?.firstNameState}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                  />
                  {/* <FormHelperText>Please enter Id number</FormHelperText> */}
                </Grid>
                <Grid item xs={12} lg={4}>
                  <InputLabel>Last Name</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Ex:  Doe"
                    helperText={userDetails?.lastNameState}
                    error={userDetails?.lastNameState}
                    value={userDetails?.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                  />
                  {/* <FormHelperText>Please enter first name</FormHelperText> */}
                </Grid>
                <Grid item xs={12} lg={4}>
                  <InputLabel>Mobile Number</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Ex: 9098787676"
                    value={userDetails?.mobileNumber}
                    helperText={userDetails?.mobileNumberState}
                    error={userDetails?.mobileNumberState}
                    onChange={(e) =>
                      handleChange('mobileNumber', e.target.value)
                    }
                  />
                  {/* <FormHelperText>Please enter block</FormHelperText> */}
                </Grid>
                <Grid item xs={12} lg={4}>
                  <InputLabel>Email</InputLabel>
                  <TextField
                    fullWidth
                    error={userDetails?.emailState}
                    helperText={userDetails?.emailState}
                    value={userDetails?.email}
                    placeholder="Ex: name@email.com"
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  {/* <FormHelperText>Please enter Email</FormHelperText> */}
                </Grid>
                <Grid item xs={12}>
                  <Stack direction={'row'} justifyContent={'flex-end'}>
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      type="submit"

                    >
                      Save
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PersonalDetails;
