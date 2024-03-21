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
      header: 'Transaction Id',
      accessorKey: 'id',
      align: 'center',
      Cell: ({ row }) => <>{row?.original?.id}</>,
    },
    {
      header: 'Bill Number',
      accessorKey: 'id',
      Cell: ({ row }) => <>{row?.original?.billing?.id}</>,
    },
    {
      header: 'Due Date',
      accessorKey: 'dueDate',
      Cell: ({ row }) => <>{row?.original?.billing?.dueDate}</>,
    },
    {
      header: 'Voucher Code',
      accessorKey: 'code',
      Cell: ({ row }) => <>{row?.original?.voucher?.code || '- -'}</>,
    },
    {
      header: 'Amount',
      Cell: ({ row }) => <>{row?.original?.billing?.amount}</>,
    },
    {
      header: 'Status',
      Cell: ({ row }) => (
        <>
          {console.log('row?.original', row?.original)}
          <Chip
            sx={{
              pl: '4px',
              pr: '4px',
              backgroundColor: row?.original.billing?.billPaid
                ? 'green'
                : 'red',
              color: '#fff',
            }}
            size="small"
            label={row?.original.billing?.billPaid ? 'Paid' : 'Not Paid'}
          ></Chip>
        </>
      ),
    },
    {
      header: 'Last Reading',
      accessorKey: 'lastReadingId',
      Cell: ({ row }) => <>{row?.original?.billing?.lastReadingId}</>,
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