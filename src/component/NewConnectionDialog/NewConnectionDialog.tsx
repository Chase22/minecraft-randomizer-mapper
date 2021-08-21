import {Button, Dialog, DialogActions, DialogContent, Snackbar} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useState} from "react";
import {ItemConnection} from "../../App";
import {Alert} from "@material-ui/lab";
import classes from './NewConnectionDialog.module.css'

interface NewConnectionDialogProps {
  onSubmit: (source: string, target: string) => void
  onClose: () => void
  open: boolean
  itemIds: string[]
  connections: ItemConnection[]
}

const NewConnectionDialog: React.FC<NewConnectionDialogProps> = ({onSubmit, itemIds, onClose, open, connections}) => {
  const [source, setSource] = useState<string>();
  const [target, setTarget] = useState<string>();

  const [sourceError, setSourceError] = useState<string>()
  const [targetError, setTargetError] = useState<string>()
  const [showErrorSnackbar, setShowErrorSnackbar] = useState<boolean>(false)

  function handleSubmit() {
    let hasError = false
    if (!source) {
      hasError = true
      setSourceError("Please select a source")
    }
    if (!target) {
      hasError = true
      setTargetError("Please select a target")
    }

    if (connections.find(connection => connection.source === source && connection.target === target)) {
      hasError = true
      setShowErrorSnackbar(true)
    }
    if (!hasError) {
      onSubmit(source!!, target!!)
    }
  }

  return (
    <Dialog open={open} fullWidth>
      <DialogContent>
        <Snackbar
          anchorOrigin={{horizontal: "center", vertical: "top"}}
          open={showErrorSnackbar}
          autoHideDuration={6000}
          onClose={() => setShowErrorSnackbar(false)}>
          <Alert onClose={() => setShowErrorSnackbar(false)} severity="error">
            This connection already exsits
          </Alert>
        </Snackbar>
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
              (e, value) => {
                setTarget(value!!)
                setTargetError(undefined)
              }
            }
            renderInput={(params) =>
              <TextField
                {...params}
                error={targetError !== undefined}
                helperText={targetError}
                label="Combo box"
                variant="outlined"
                value={target}
              />
            }
            options={itemIds}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={sourceError !== undefined || targetError !== undefined}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewConnectionDialog