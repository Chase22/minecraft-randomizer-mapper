import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import React, {useState} from "react";

interface ZoomInputProps {
  onSubmit: (id: string) => void
  nodes: string[]
}

const ZoomInput: React.FC<ZoomInputProps> = ({onSubmit, nodes}) => {
  const [id, setId] = useState<string>()

  return (
    <>
      <Autocomplete
        onChange={
          (e, value) => {
            setId(value!!)
          }
        }
        renderInput={(params) =>
          <TextField
            {...params}
            label="Combo box"
            variant="outlined"
            value={id}/>
        }
        options={nodes}
      />
      <button onClick={() => onSubmit(id!!)} disabled={id === undefined}>Submit</button>
    </>
  )
}

export default ZoomInput