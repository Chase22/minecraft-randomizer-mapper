import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, {useState} from 'react';
import './App.css';
import Layout from "./component/Layout-Flow";
import NewConnectionDialog from "./component/NewConnectionDialog/NewConnectionDialog";
import items from './resources/items.json'
import {Fab} from "@material-ui/core";
import RemoveConnectionDialog from "./component/RemoveConnectionDialog/RemoveConnectionDialog";
import useStickyState from "./util/stickyState";

export interface ItemConnection {
  source: string,
  target: string
}

function App() {
  const [connections, setConnections] = useStickyState<ItemConnection[]>([], "itemconnection")

  const [newConnectionDialogOpen, setNewConnectionDialogOpen] = useState<boolean>(false)
  const [deleteConnectionDialogOpen, setDeleteConnectionDialogOpen] = useState<boolean>(false)

  const handleNewConnection = (source: string, target: string) => {
    setConnections([...connections, {source, target}])
    setNewConnectionDialogOpen(false)
  }

  return (
    <div className="App">
      <Layout connections={connections}/>
      <NewConnectionDialog
        onSubmit={handleNewConnection}
        onClose={() => setNewConnectionDialogOpen(false)}
        itemIds={items.map(value => value.name).sort()}
        connections={connections}
        open={newConnectionDialogOpen}
      />
      <RemoveConnectionDialog
        onDelete={(itemsToDelete: ItemConnection[]) => {
          setConnections(connections.filter(connection => !itemsToDelete.includes(connection)))
          setDeleteConnectionDialogOpen(false)
        }}
        onClose={() => {
          setDeleteConnectionDialogOpen(false)
        }}
        open={deleteConnectionDialogOpen}
        connections={connections}
      />
      <Fab color="primary" onClick={() => setNewConnectionDialogOpen(true)}>
        <AddIcon/>
      </Fab>
      <Fab color="secondary" onClick={() => setDeleteConnectionDialogOpen(true)}>
        <DeleteIcon/>
      </Fab>
    </div>
  );
}

export default App;
