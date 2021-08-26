import ConfirmationDialog from "../../ConfirmationDialog";
import {getId, ItemConnection} from "../../../util/ItemConnection";
import ConnectionTable from "../ConnectionTable/ConnectionTable";
import React, {useState} from "react";

export interface RemoveConnectionsProps {
  connections: ItemConnection[]
  onDelete: (itemsToDelete: ItemConnection[]) => void
}

const RemoveConnections: React.FC<RemoveConnectionsProps> = ({connections, onDelete}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false)

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
    <>
      <ConfirmationDialog
        text={"Do you want to delete the selected Connections?"}
        open={showConfirmation}
        onOk={() => {
          onDelete(connections.filter(value => selectedIds.includes(getId(value))))
          setShowConfirmation(false)
          setSelectedIds([])
        }}
        onCancel={() => setShowConfirmation(false)}
      />
      <ConnectionTable
        connections={connections}
        selectedIds={selectedIds}
        onSelect={handleToggle}
        onSelectAll={handleSelectAll}
        onDelete={() => setShowConfirmation(true)}
      />
    </>
  )
}

export default RemoveConnections