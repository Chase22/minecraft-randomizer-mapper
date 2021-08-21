import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText, useMediaQuery, useTheme
} from "@material-ui/core";
import React, {useState} from "react";
import {ItemConnection} from "../../App";
import ConfirmationDialog from "../ConfirmationDialog";

interface RemoveConnectionDialogProps {
  onDelete: (itemsToDelete: ItemConnection[]) => void
  onClose: () => void
  open: boolean
  connections: ItemConnection[]
}

const RemoveConnectionDialog: React.FC<RemoveConnectionDialogProps> = ({onDelete, onClose, connections, open}) => {
  const [selectedConnections, setSelectedConnections] = useState<ItemConnection[]>([])
  const [showConfirmation, setShowConfirmation] = useState(false)

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggle = (connection: ItemConnection) => () => {
    const currentIndex = selectedConnections.indexOf(connection);
    const newConnections = [...selectedConnections];

    if (currentIndex === -1) {
      newConnections.push(connection);
    } else {
      newConnections.splice(currentIndex, 1);
    }

    setSelectedConnections(newConnections);
  };

  return (
    <Dialog open={open} fullWidth fullScreen={fullScreen} scroll="paper">
      <ConfirmationDialog
        text={"Do you want to delete the selected Connections?"}
        open={showConfirmation}
        onOk={() => {
          onDelete(selectedConnections)
          setShowConfirmation(false)
        }}
        onCancel={() => setShowConfirmation(false)}
        />
      <DialogContent>
        <List>
          {connections.map(connection => (
            <ListItem key={`${connection.source}-${connection.target}`} dense button onClick={handleToggle(connection)}>
              <ListItemIcon>
                <Checkbox checked={selectedConnections.includes(connection)} disableRipple />
              </ListItemIcon>
              <ListItemText>{`${connection.source}=>${connection.target}`}</ListItemText>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => setShowConfirmation(true)}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default RemoveConnectionDialog