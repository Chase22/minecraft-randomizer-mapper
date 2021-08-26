import {Checkbox, TableCell, TableHead, TableRow} from "@material-ui/core";
import React from "react";

interface ConnectionTableHeaderProps {
  selectedCount: number
  rowCount: number
  onSelectAllClick: () => void
}


const ConnectionTableHeader: React.FC<ConnectionTableHeaderProps> = (
  {onSelectAllClick, selectedCount, rowCount}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={selectedCount > 0 && selectedCount < rowCount}
            checked={rowCount > 0 && selectedCount === rowCount}
            onChange={onSelectAllClick}
            inputProps={{'aria-label': 'select all'}}
          />
        </TableCell>
        <TableCell>Source</TableCell>
        <TableCell>Target</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default ConnectionTableHeader