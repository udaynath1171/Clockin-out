import React from 'react';
import {
  Button
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog = (props) => {
  const handleCloseDialog = (action) => {
    if (action) {
      props.setConfirmRemoveAction(true)
    }

    props.setOpenConfirmDialog(false);
  };

  return (
    <>
      <Dialog
        open={props.openConfirmDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleCloseDialog(false)}} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {handleCloseDialog(true)}} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmDialog
