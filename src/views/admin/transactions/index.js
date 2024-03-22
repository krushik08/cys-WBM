import { Box, Card, CardContent, Chip, Divider, Grid, IconButton, Typography } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react'
import api from '../../../api';
import ApiService from '../../../api';

const Transactions = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  
const fetchTransactions = ()=>{
   ApiService.request
     (`/payment/get-transactions-history`,'get')
     .then((response) => {
       if (response.status === 200) {
         setTransactionsList(response?.data);
       }
     })
     .catch((err) => {});
}
useEffect(()=>{
fetchTransactions()
return ()=>{

}
},[])
const columns = useMemo(
  () => [
    {
      header: 'Customer Name',
      accessorKey: 'customername',
      align: 'center',
      Cell: ({ row }) => <>{row?.original?.customerName}</>,
    },
    {
      header: 'Water Consumption',
      accessorKey: 'waterConsumption',
      Cell: ({ row }) => <>{row?.original?.waterConsumption}</>,
    },
    {
      header: 'Status',
      Cell: ({ row }) => (
        <Chip
          sx={{
            pl: '4px',
            pr: '4px',
            backgroundColor: row?.original.billPaidDate ? 'green' : 'red',
            color: '#fff',
          }}
          size="small"
          label={row?.original.billPaidDate ? 'Paid' : 'Not Paid'}
        ></Chip>
      ),
    },
    {
      header: 'Amount',
      Cell: ({ row }) => <>{row?.original?.billAmount}</>,
    },
  ],
  []
);

  return (
    <Grid item xs={12} mt={2}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h1" fontWeight={'bold'} color={'primary'}>
            Transactions
          </Typography>

          <Box
            sx={{
              overflow: 'auto',
            }}
          >
            <MaterialReactTable
              columns={columns}
              data={transactionsList || []}
            
              positionActionsColumn="last"
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Transactions