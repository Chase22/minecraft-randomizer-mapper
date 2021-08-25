import {Button, Paper} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, {useState} from "react";
import classes from './AddConnections.module.css'
import {ItemConnection} from "../../../util/ItemConnection";
import {NotificationBarRequest} from "../EditConnectionsDialog";

export interface AddConnectionsProps {
  onSubmit: (source: string, target: string) => void
  itemIds: string[]
  connections: ItemConnection[]
  requestNotification: (request: NotificationBarRequest) => void
}

const AddConnections: React.FC<AddConnectionsProps> = ({onSubmit, itemIds, connections, requestNotification}) => {
  const [source, setSource] = useState<string>();
  const [target, setTarget] = useState<string>();

  const [sourceError, setSourceError] = useState<string>()

  function handleSubmit() {
    let hasError = false
    if (!source) {
      hasError = true
      setSourceError("Please select a source")
    }

    if (connections.find(connection => connection.source === source && connection.target === target)) {
      hasError = true
      requestNotification({severity: "error", text: "This connection already exist"})
    }
    if (!hasError) {
      onSubmit(source!!, target!!)
      setSource(undefined)
      setTarget(undefined)
    }
  }

  return (
    <Paper>
      <div className={classes.dialogContent}>
        <Autocomplete
          className={classes.autoCorrect}
          onChange={
            (e, value) => {
              setSource(value!!)
              setSourceError(undefined)
            }
          }
          renderInput={(params) =>
            <TextField
              {...params}
              error={sourceError !== undefined}
              helperText={sourceError}
              label="Combo box"
              variant="outlined"
              value={source}/>
          }
          options={itemIds}
        />
        <div className={classes.arrow}>{"=>"}</div>
        <Autocomplete
          className={classes.autoCorrect}
          onChange={
            (e, value) => setTarget(value!!)
          }
          renderInput={(params) =>
            <TextField
              {...params}
              label="Combo box"
              variant="outlined"
              value={target}
            />
          }
          options={itemIds}
        />
      </div>
      <Button onClick={handleSubmit} disabled={sourceError !== undefined}>Submit</Button>
    </Paper>
  )
}

export default AddConnections