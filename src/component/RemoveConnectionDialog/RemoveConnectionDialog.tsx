import {Button, Dialog, DialogActions, DialogContent, useMediaQuery, useTheme} from "@material-ui/core";
import React, {useState} from "react";
import ConfirmationDialog from "../ConfirmationDialog";
import ConnectionTable from "./ConnectionTable/ConnectionTable";
import {getId, ItemConnection} from "../../util/ItemConnection";

interface RemoveConnectionDialogProps {
  onDelete: (itemsToDelete: ItemConnection[]) => void
  onClose: () => void
  open: boolean
  connections: ItemConnection[]
}

const RemoveConnectionDialog: React.FC<RemoveConnectionDialogProps> = ({onDelete, onClose, connections, open}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false)

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function handleSelectAll() {
    if (selectedIds.length === connections.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(connections.map(getId))
    }
  }

  function handleToggle(id: string) {
    const index = selectedIds.indexOf(id)
    if (index === -1) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter(value => value !== id))
    }
  }


  return (
    <Dialog open={open} fullWidth fullScreen={fullScreen} scroll="paper">
      <ConfirmationDialog
        text={"Do you want to delete the selected Connections?"}
        open={showConfirmation}
        onOk={() => {
          onDelete(connections.filter(value => selectedIds.includes(getId(value))))
          setShowConfirmation(false)
        }}
        onCancel={() => setShowConfirmation(false)}
      />
      <DialogContent>
        <ConnectionTable
          connections={connections}
          selectedIds={selectedIds}
          onSelect={handleToggle}
          onSelectAll={handleSelectAll}
          onDelete={() => setShowConfirmation(true)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default RemoveConnectionDialog