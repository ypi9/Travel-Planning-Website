import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import FlightTicketCard from './FlightTicketsTable';


// export default function LazyTable({ route }) {
    export default function LazyTable({ data }) {
    // const [data, setData] = useState(data);

    const [page, setPage] = useState(1);
    const pageSize = 10;

    const handleChangePage = (e, newPage) => {
        // Can always go to previous page (TablePagination prevents negative pages)
        // but only fetch next page if we haven't reached the end (currently have full page of data)
        if (newPage < page || data.length === pageSize) {
            // Note that we set newPage + 1 since we store as 1 indexed but the default pagination gives newPage as 0 indexed
            setPage(newPage + 1);
        }
    }

    const handleChangePageSize = (e) => {
        // when handling events such as changing a selection box or typing into a text box,
        // the handler is called with parameter e (the event) and the value is e.target.value
        const newPageSize = e.target.value;

        setPageSize(newPageSize);
        setPage(1);
    }

    const defaultRenderCell = (col, row) => {
        return <div>{row[col.field]}</div>;
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    {/* <TableRow>
                        {columns.map(col => <TableCell key={col.headerName}>{col.headerName}</TableCell>)}
                    </TableRow> */}
                </TableHead>
                <TableBody>
                    {data.map((row, idx) => (
                        <TableRow key={idx}>
                            <TableCell >
                            <FlightTicketCard data={row}/>
                            </TableCell>
                        </TableRow>
                    ))}
                       

                </TableBody>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={-1}
                    rowsPerPage={pageSize}
                    page={page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangePageSize}
                />
            </Table>
        </TableContainer>
    )
}