import EditIcon from '@material-ui/icons/Edit';
import MenuIcon from '@material-ui/icons/Menu';
import React, {useState} from 'react';
import './App.css';
import {AppBar, Drawer, Fab, IconButton, Toolbar, Typography} from "@material-ui/core";
import useStickyState from "./util/stickyState";
import {ItemConnection} from "./util/ItemConnection";
import EditConnectionsDialog from "./component/EditConnectionDialog/EditConnectionsDialog";
import NodeRenderer from "./component/NodeRenderer/NodeRenderer";
import ZoomInput from "./component/ZoomInput";
import data from 'minecraft-data'
import DrawerMenu from "./component/DrawerMenu/DrawerMenu";

function App() {
  const [connections, setConnections] = useStickyState<ItemConnection[]>([], "itemconnection")

  const [drawerOpen, setDrawerOpen] = useState(false)
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

  const ids = Object.values(data("1.17.1").items).map(item => item.displayName)

  const sources = connections.map(value => value.source);
  const targets = connections.map(value => value.target).filter(value => value !== undefined) as string[];

  let nodeNames = Array.from(new Set([...sources, ...targets]));

  return (
    <div className="App">
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            edge="start"
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap>
            Minecraft Randomizer Map
          </Typography>
          <ZoomInput onSubmit={id => {
            if (onFocusIdHandler) {
              onFocusIdHandler(id)
            }
          }} nodes={nodeNames}/>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerMenu onClose={() => setDrawerOpen(false)}/>
      </Drawer>
      <NodeRenderer connections={connections} setOnFocusIdHandler={setOnFocusIdHandler} sources={sources}
                    targets={targets}/>
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
      </div>
    </div>
  );
}

export default App;
