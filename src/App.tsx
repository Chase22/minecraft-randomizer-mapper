import AddIcon from '@material-ui/icons/Add';
import React, {useState} from 'react';
import './App.css';
import Layout from "./component/Layout-Flow";
import NewConnectionDialog from "./component/NewConnectionDialog/NewConnectionDialog";
import items from './resources/items.json'
import {Fab} from "@material-ui/core";

export interface ItemConnection {
  source: string,
  target: string
}

function App() {
  const [connections, setConnections] = useState<ItemConnection[]>([])

  const [newConnectionDialogOpen, setNewConnectionDialogOpen] = useState<boolean>(false)

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
      <Fab onClick={() => setNewConnectionDialogOpen(true)}>
        <AddIcon/>
      </Fab>
    </div>
  );
}

export default App;
