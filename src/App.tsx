import EditIcon from '@material-ui/icons/Edit';
import React, {useState} from 'react';
import './App.css';
import Layout from "./component/Layout-Flow";
import items from './resources/items.json'
import entities from './resources/entities.json'
import {Fab} from "@material-ui/core";
import useStickyState from "./util/stickyState";
import {ItemConnection} from "./util/ItemConnection";
import EditConnectionsDialog from "./component/EditConnectionDialog/EditConnectionsDialog";

function App() {
  const [connections, setConnections] = useStickyState<ItemConnection[]>([], "itemconnection")

  const [showEditDialog, setShowEditDialog] = useState<boolean>(false)

  const handleNewConnection = (source: string, target: string) => {
    const newConnections = connections.filter(value => !((value.source === source || value.target === source) && value.target === undefined))
    newConnections.push({source, target})
    setConnections(newConnections)
  }

  const ids = Array.from(new Set([...items.map(item => item.name), ...entities.map(entity => entity.name)]))

  return (
    <div className="App">
      <Layout connections={connections}/>
      <EditConnectionsDialog
        onSubmit={handleNewConnection}
        itemIds={ids.sort()}
        onDelete={(itemsToDelete: ItemConnection[]) => {
          setConnections(connections.filter(connection => !itemsToDelete.includes(connection)))
        }}
        onClose={() => {
          setShowEditDialog(false)
        }}
        open={showEditDialog}
        connections={connections}
      />
      <Fab color="primary" onClick={() => setShowEditDialog(true)}>
        <EditIcon/>
      </Fab>
    </div>
  );
}

export default App;
