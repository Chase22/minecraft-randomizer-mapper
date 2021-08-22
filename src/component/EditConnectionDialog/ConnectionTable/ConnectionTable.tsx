import React from "react";
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from "@material-ui/core";
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, connections.length - page * rowsPerPage);

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
            {connections
              .sort((a, b) => a.source.localeCompare(b.source))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(connection => {
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
            {emptyRows > 0 && (
              <TableRow style={{height: (53 * emptyRows)}}>
                <TableCell colSpan={3}/>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={connections.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default ConnectionTable