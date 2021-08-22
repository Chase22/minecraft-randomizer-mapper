import React from "react";
import {Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import ConnectionTableHeader from "./ConnectionTableHeader";
import {getId, ItemConnection} from "../../../util/ItemConnection";
import ConnectionTableToolbar from "./ConnectionTableToolbar";

interface ConnectionTableProps {
  connections: ItemConnection[]
  selectedIds: string[],
  onSelectAll: () => void,
  onSelect: (id: string) => void,
  onDelete: () => void
}

const ConnectionTable: React.FC<ConnectionTableProps> = (
  {
    connections,
    selectedIds,
    onDelete,
    onSelectAll,
    onSelect
  }
) => {
  return (
    <Paper elevation={0}>
      <ConnectionTableToolbar numSelected={selectedIds.length} onDelete={onDelete}/>
      <TableContainer>
        <Table>
          <ConnectionTableHeader
            selectedCount={selectedIds.length}
            rowCount={connections.length}
            onSelectAllClick={onSelectAll}
          />
          <TableBody>
            {connections.map(connection => {
              const id = getId(connection);

              return (
                <TableRow onClick={() => onSelect(id)}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.includes(id)}
                    />
                  </TableCell>
                  <TableCell>{connection.source}</TableCell>
                  <TableCell>{connection.target}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default ConnectionTable