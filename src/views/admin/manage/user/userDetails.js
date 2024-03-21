import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import MaterialReactTable from "material-react-table";
import toast from "react-hot-toast";
import ApiService from "../../../../api";
import AlertItemDelete from "../../../../components/Common/AlertItemDelete.js";



const initialState = {
  firstName: '',
  firstNameState: null,
  lastName: '',
  lastNameState: '',
  mobileNumber: null,
  mobileNumberState: '',
  email: '',
  emailState: null,
};
const UserDetails = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userDetails, setUserDetails] = useState(initialState);
  const [userList, setUserList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [deleteModel,setDeleteModel] = useState({
    title:"",
    isOpen:false
  })
  const open = Boolean(anchorEl);


      const [openDeleteModel, setOpenDeleteModel] = useState(false);
      const handleModalClose = (status) => {
        setOpenDeleteModel(false);
      };

  const handleClick = (event,userDetails) => {
    setSelectedUser(userDetails);
    setSelectedStatus(userDetails?.status ? 'Disabled' :'Enable');
    setAnchorEl(event.currentTarget);
     
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange  = (name,value)=>{
    setUserDetails({...userDetails,[name]:value,[`${name}State`]:''})
  }
  useEffect(()=>{
    fetchCustomerList()
  },[])
  const fetchCustomerList = async () => {
     ApiService.request('/user/get-users', 'get')
       .then((response) => {
         if (response.status === 200) {
           setUserList(response.data);
         }
       })
       .catch((err) => {});
  
  }
  
  const handleEdit  = ()=>{
    setAnchorEl(null);
    ApiService.request(`/user/get-user/${selectedUser?.id}`, 'get')
      .then((response) => {
        if (response.status === 200) {
          setUserDetails(response.data);
        }
      })
      .catch((err) => {});
    
  }
  const handleDelete = () => {
    setDeleteModel({
      isOpen: open,
      title: 'Are you sure you want to delete this item?',
    });
    setAnchorEl(null);
   
  };
  const handleConfirmed = ()=>{
    ApiService.request(`/user/delete-user/${selectedUser?.id}`,'delete')
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
          fetchCustomerList();
          setSelectedUser();
          setUserDetails(initialState);
           setDeleteModel({
             isOpen: false,
             title: '',
           });
        }
      })
      .catch((err) => {});
  }
   const handleAction = () => {
     setAnchorEl(null);
     ApiService.request(`/user/${selectedUser?.status ? 'disable':'enable'}/${selectedUser?.id}`,'put')
       .then((response) => {
         if (response.status === 200) {
           toast.success(response.data.message);
           fetchCustomerList();
           setSelectedUser();
           setUserDetails(initialState);
         }
       })
       .catch((err) => {});
   };
   const customValidation=()=>{
      let newState = {...userDetails}
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(newState.firstName ===""){
        newState['firstNameState'] = 'First name is required';
      }else{
        newState['firstNameState'] = null;
      }
      if(newState.lastName ===""){
        newState['lastNameState'] = 'Last name is required';
      }else{
        newState['lastNameState'] = null;
      }
      if(newState.mobileNumber ==="" || newState.mobileNumber?.length !== 10){
        newState['mobileNumberState'] = 'Invalid mobile number';
      }else{
        newState['mobileNumberState'] = null;
      }
      if (newState.email === '' || !emailRegex.test(newState.email)) {
        newState['emailState'] = 'Invalid emil address';
      } else {
        newState['emailState'] = null;
      }
      setUserDetails({ ...newState });
   }
const handleSubmit = async (e) => {
  e.preventDefault();
  customValidation()
  if(!userDetails.firstNameState && !userDetails.lastNameState && !userDetails.mobileNumberState && !userDetails.emailState){
    const token = JSON.parse(localStorage.getItem('user-info'))?.accessToken; // replace with your token
    if (selectedUser?.id) {
      ApiService.request
        (`/user/update-user-details`,'put', userDetails, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success('Customer Updated Successfully');
            fetchCustomerList();
            setSelectedUser();
            setUserDetails(initialState);
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
    } else {
      await ApiService.request
        ('/user/add', userDetails,'post', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            toast.success('Customer Added Successfully');
            fetchCustomerList();
            setUserDetails(initialState);
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
    }
  }
  
};
const columns = useMemo(
  () => [
    {
      header: 'First Name',
      accessorKey: 'firstName',
      Cell: ({ row }) => <>{row?.original?.firstName}</>,
    },
    {
      header: 'Last Name',
      accessorKey: 'firstName',
      Cell: ({ row }) => <>{row?.original?.lastName}</>,
    },
    {
      header: 'Mobile Number',
      accessorKey: 'mobileNumber',
      Cell: ({ row }) => <>{row?.original?.mobileNumber}</>,
    },
    {
      header: 'Email',
      Cell: ({ row }) => <>{row?.original?.email}</>,
    },
    {
      header: 'Status',
      Cell: ({ row }) => (
        <>
          {' '}
          <Chip
            sx={{
              pl: '4px',
              pr: '4px',
              backgroundColor: row?.original.status ? 'green' : 'red',
              color: '#fff',
            }}
            size="small"
            label={row?.original.status ? 'Enable' : 'Disable'}
          ></Chip>
        </>
      ),
    },
    {
      header: 'Role',
      Cell: ({ row }) => <>{row?.original?.role}</>,
    },
  ],
  []
);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1" fontWeight={'bold'} color={'primary'}>
          User Details
        </Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Card variant="outlined">
          <CardContent>
            <Grid item xs={12} mb={3}>
              <Typography variant="h2" fontWeight={'bold'} color={'primary'}>
                User
              </Typography>
            </Grid>
            <Box component={'form'} onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} lg={4}>
                  <InputLabel>First Name</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Ex: Jhon"
                    value={userDetails?.firstName}
                    helperText={userDetails.firstNameState}
                    error={userDetails.firstNameState}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                  />
                  {/* <FormHelperText>Please enter Id number</FormHelperText> */}
                </Grid>
                <Grid item xs={12} lg={4}>
                  <InputLabel>Last Name</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Ex:  Doe"
                    helperText={userDetails.lastNameState}
                    error={userDetails.lastNameState}
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
                    helperText={userDetails.mobileNumberState}
                    error={userDetails.mobileNumberState}
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
                      // startIcon={<PersonAddAlt1TwoToneIcon />}
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
      <Grid item xs={12} mt={2}>
        <Card variant="outlined">
          <CardContent>
            <Box mt={2}>
              <Divider sx={{ border: '1px solid #f1f1f1' }} />
            </Box>

            <Box
              sx={{
                overflow: 'auto',
              }}
            >
              <MaterialReactTable
                columns={columns}
                data={userList || []}
                enableRowActions
                enableRowNumbers
                positionActionsColumn="last"
                renderRowActions={({ row, table }) => (
                  <Box
                    sx={{
                      marginLeft: 'auto',
                    }}
                  >
                    <IconButton
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={(e) => handleClick(e, row?.original)}
                    >
                      <MoreVertOutlinedIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        'aria-labelledby': 'long-button',
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={handleEdit}>
                        <Typography>Edit</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleAction}>
                        <Typography>{selectedStatus}</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleDelete}>
                        <Typography>Delete</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                )}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <AlertItemDelete
        title={deleteModel?.title}
        open={deleteModel?.isOpen}
        handleClose={() => {
          setDeleteModel({
            isOpen: false,
            title: '',
          });
        }}
        handleConfirmed={handleConfirmed}
      />
    </Grid>
  );
};

export default UserDetails;
