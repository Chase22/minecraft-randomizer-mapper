import {Button, Dialog, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";
import React from "react";

interface ConfirmationDialogProps {
  text: string
  open: boolean
  onOk: () => void
  onCancel: () => void
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({onCancel, open, onOk, text}) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog