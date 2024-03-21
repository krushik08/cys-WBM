import PropTypes from 'prop-types';

// material-ui
import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';

// ==============================|| KANBAN BOARD - ITEM DELETE ||============================== //

export default function AlertItemDelete({ title, open, handleClose, handleConfirmed }) {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      keepMounted
      maxWidth="xs"
      aria-labelledby="item-delete-title"
      aria-describedby="item-delete-description"
    >
      {open && (
        <>
        <Box sx={{height:"150px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <Typography variant='h1'>Delete!!</Typography>
          <DialogTitle id="item-delete-title">
            <Typography variant='h2' textAlign={"center"}>
            {title}
            </Typography>
            </DialogTitle>
        </Box>
 
          <DialogActions sx={{ mr: 2 }}>
            <Button onClick={handleClose} color="error" size="large">
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={handleConfirmed}
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

AlertItemDelete.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string
};
