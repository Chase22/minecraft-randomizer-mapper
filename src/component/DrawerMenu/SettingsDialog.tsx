import React from "react"
import {Dialog} from "@material-ui/core";

export interface SettingsDialogProps {
    open: boolean
    onClose: () => void
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({onClose, open}) => {

  return (
    <Dialog open={open} onClose={onClose} fullScreen={true}>

    </Dialog>
  )
}

export default SettingsDialog