import {Button, Dialog, DialogActions, DialogContent, useMediaQuery, useTheme} from "@material-ui/core";
import React, {useState} from "react";
import RemoveConnections, {RemoveConnectionsProps} from "./RemoveConnections/RemoveConnections";
import AddConnections, {AddConnectionsProps} from "./AddConnections/AddConnections";
import {AlertProps} from "@material-ui/lab";
import NotificationBar from "./NotificationBar";
import {ItemConnection} from "../../util/ItemConnection";


interface EditConnectionsDialogProps {
  onClose: () => void
  open: boolean,
  connections: ItemConnection[],
  onSubmit: AddConnectionsProps["onSubmit"],
  itemIds: AddConnectionsProps["itemIds"],
  onDelete: RemoveConnectionsProps["onDelete"]
}

export interface NotificationBarRequest {
  text: string,
  severity: AlertProps["severity"]
}

const EditConnectionsDialog: React.FC<EditConnectionsDialogProps> = (
  {onDelete, onClose, connections, open, onSubmit, itemIds}
) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [notificationBarRequest, setNotificationBarRequest] = useState<NotificationBarRequest | undefined>(undefined)

  const requestNotificationBar = (request: NotificationBarRequest) => setNotificationBarRequest(request)

  const handleSubmit = (source: string, target: string) => {
    setNotificationBarRequest({severity: "success", text: `Connection ${source}=>${target} added`})
    onSubmit(source, target)
  }

  return (
    <Dialog open={open} fullWidth fullScreen={fullScreen} scroll="paper">
      <NotificationBar
        onClose={() => setNotificationBarRequest(undefined)}
        severity={notificationBarRequest?.severity || "info"}
        text={notificationBarRequest?.text}
      />
      <DialogContent>
        <AddConnections onSubmit={handleSubmit} itemIds={itemIds} connections={connections}
                        requestNotification={requestNotificationBar}/>
        <RemoveConnections connections={connections} onDelete={onDelete}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditConnectionsDialog