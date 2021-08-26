import React, {useState} from "react"
import {List, ListItem, ListItemText} from "@material-ui/core";
import SettingsDialog from "./SettingsDialog";

interface DrawerMenuProps {
  onClose: () => void
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({onClose}) => {
  const [settingOpen, setSettingsOpen] = useState<boolean>(false);


  return (
    <>
      <SettingsDialog open={settingOpen} onClose={() => {
        setSettingsOpen(false)
        onClose()
      }}/>
      <List>
        <ListItem onClick={() => setSettingsOpen(true)}>
          <ListItemText>Settings</ListItemText>
        </ListItem>
      </List>
    </>
  )
}

export default DrawerMenu