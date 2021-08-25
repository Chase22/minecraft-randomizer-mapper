import EditIcon from '@material-ui/icons/Edit';
import React, {useCallback, useState} from 'react';
import './App.css';
import items from './resources/items.json'
import entities from './resources/entities.json'
import {Fab} from "@material-ui/core";
import useStickyState from "./util/stickyState";
import {ItemConnection} from "./util/ItemConnection";
import EditConnectionsDialog from "./component/EditConnectionDialog/EditConnectionsDialog";
import NodeRenderer from "./component/NodeRenderer/NodeRenderer";
import ZoomInput from "./component/ZoomInput";

function App() {
  const [connections, setConnections] = useStickyState<ItemConnection[]>([], "itemconnection")

  const [showEditDialog, setShowEditDialog] = useState<boolean>(false)
  const [onFocusIdHandler, setOnFocusIdHandler] = useState<((id: string) => void)>(() => {
  })

  const handleNewConnection = (source: string, target: string) => {
    const newConnections = connections.filter(value => !((value.source === source || value.target === source) && value.target === undefined))
    newConnections.push({source, target})
    setConnections(newConnections)
  }

  // const jsonString = JSON.stringify(connections);
  // deflate(jsonString, (error, result) => {
  //   if (error) {
  //     console.error(error.message)
  //     return;
  //   }
  //   console.log(`Uncompressed: ${Buffer.from(jsonString).toString("Base64").length}`)
  //   console.log(`Compressed: ${result.toString("Base64").length}`);
  // });

  const ids = Array.from(new Set([...items.map(item => item.name), ...entities.map(entity => entity.name)]))

  const sources = connections.map(value => value.source);
  const targets = connections.map(value => value.target).filter(value => value !== undefined) as string[];

  let nodeNames = Array.from(new Set([...sources, ...targets]));

  return (
    <div className="App">
      <NodeRenderer connections={connections} setOnFocusIdHandler={setOnFocusIdHandler} sources={sources} targets={targets}/>
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
      <div>
        <Fab color="primary" onClick={() => setShowEditDialog(true)}>
          <EditIcon/>
        </Fab>
        <ZoomInput onSubmit={id => {
          console.log(onFocusIdHandler)
          console.log(id)
          if (onFocusIdHandler) {
            onFocusIdHandler(id)
          }
        }} nodes={nodeNames}/>
      </div>
    </div>
  );
}

export default App;
