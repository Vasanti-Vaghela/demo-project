import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow ,TableSortLabel} from "@mui/material";
import { useEffect, useState } from "react";

const Muitable = () => {
    

    const handlechangepage = (event, newpage) => {
        pagechange(newpage)
    }
    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value)
        pagechange(0);
    }

    const [rows, rowchange] = useState([]);
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(10);
    const [rowData, setRowData]= useState(rows);
    const [orderDirection, setOrderDirection]= useState("asc");

    const sortArray= (arr, orderBy)=> {
        switch (orderBy){
            case "asc":
              default:
                return arr.sort ((a,b)=>
                a.gender> b.gender? 1:b.gender > a.gender? -1:0
                    );
            case "desc":
                return arr.sort((a, b)=>
                a.gender < b.gender ? 1 : b.gender < a.gender ? -1 : 0 
                );
        }
    };

    const handleSortRequest = ()=>{
        setRowData(sortArray(rows, orderDirection));
        setOrderDirection(orderDirection === "asc"? "desc":"asc");
    }
    useEffect(() => {
        fetch("https://randomuser.me/api/?results=100").then(resp => {
            return resp.json();
        }).then(resp => {
            console.log(resp)
            
            rowchange(resp.results);
        }).catch(e => {
            console.log(e.message)
        })

    }, [])

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>MUI Table</h1>

            <Paper sx={{ width: '90%', marginLeft: '5%' }}>
                <TableContainer sx={{maxHeight:450}}>
                    <Table stickyHeader>
                    <TableHead>
                    <TableRow>
                <TableCell component="th" scope="row" >
                    Fullname                 
                </TableCell>
                <TableCell align="right" onClick={handleSortRequest}>
                    <TableSortLabel active={true} direction={orderDirection}>
                        Gender
                    </TableSortLabel>
                </TableCell>
                <TableCell  align="right">
                    Email
                </TableCell>
              </TableRow>
                    </TableHead>
                    
                        <TableBody>
                            {rows && rows
                                .slice(page * rowperpage, page * rowperpage + rowperpage)
                                .map((row, i) => {
                                    return (
                                        <TableRow key={i}>
                  <TableCell component="th" scope="row">
                  { (row.name.first)+ " " +(row.name.last)}
                  </TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    rowsPerPage={rowperpage}
                    page={page}
                    count={rows.length}
                    component="div"
                    onPageChange={handlechangepage}
                    onRowsPerPageChange={handleRowsPerPage}

                >

                </TablePagination>
            </Paper>

        </div>
    );
}

export default Muitable;