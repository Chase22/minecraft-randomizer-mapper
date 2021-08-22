import {Alert, AlertProps} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";
import React from "react";

interface NotificationBarProps {
  severity: AlertProps["severity"]
  onClose: () => void
  text?: String
}

const NotificationBar: React.FC<NotificationBarProps> = ({text, severity, onClose}) =>
  (
    <Snackbar
      anchorOrigin={{horizontal: "center", vertical: "top"}}
      open={text !== undefined}
      autoHideDuration={6000}
      onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  )

export default NotificationBar