import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import './App.css';
import ActionButton from './parts/ActionButtion'
import AddExpenseModal from "./parts/AddExpenseModal";

import { useDispatch, useSelector } from "react-redux";
import { getExpenseList } from "../redux/actions/expenseActions";
import store from "../redux/store";

const headCells = [
    {
        id: 'Item',
        numeric: false,
        disablePadding: false,
        label: 'Item',
    },
    {
        id: 'Amount',
        numeric: true,
        disablePadding: false,
        label: 'Amount',
    },
    {
        id: 'Date',
        numeric: false,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'Category',
        numeric: false,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'Remove',
        numeric: false,
        disablePadding: false,
        label: 'Remove',
    },
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}>

                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function createData(id,Item, Amount, Date, Category) {
    return {
        id,
        Item,
        Amount,
        Date,
        Category
    };
}

function ExpenseEntryItemList() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('Item');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const dispatch = useDispatch();
    const expenseReducer1 = useSelector((state) => state.expenseReducer);
    const { data, loading } = expenseReducer1;


        React.useEffect(() => {

            console.log(store.getState())

            if(data != null){
                dispatch(getExpenseList);
                //console.log(data.toString()+" is me")
            }


        }, []);




    //const [data, setItem] = React.useState([]);

    /*React.useEffect(() => {
        dispatch(getExpenseList);

        setItem(data2)

        console.log(data.toString()+" is me")

    }, []);*/

    /*React.useEffect(() => {
        dispatch(getExpenseList);

        console.log(data.toString()+" is me")

    }, []);*/


   /* React.useEffect(() => {

        const categories = dispatch(getExpenseList);

        //console.log(categories)

    }, [data,loading,error]);*/

    const handleExpenseList = () => {
        dispatch(getExpenseList(true));
        //console.log(store.getState());
        if(data != null){
            console.log(data+" is me")
        }
    };

    /*React.useEffect(() => {

        const categories =  dispatch(getExpenseList);

        console.log(categories)

    }, [data,loading,error]);*/

    //const [data, setItem] = React.useState([]);

    /*React.useEffect(() => {
        fetch(`http://localhost:8000/api/expenses`)
            .then(results => results.json())
            .then(data => {

                var rows = []

                for (var i = 0; i < data.length; i++) {
                    rows = [...rows, createData(data[i]._id, data[i].name, data[i].amount, new Date(data[i].spend_date).toDateString(), data[i].category)]
                }
                setItem(rows)
                setDense(false)
            });
    });*/

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>

            <button onClick={handleExpenseList}>Get List</button>

            <AddExpenseModal/>

            {/*<Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}>

                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}/>

                        <TableBody>
                             if you don't need to support IE11, you can replace the `stableSort` call with:
                                rows.slice().sort(getComparator(order, orderBy))
                            {stableSort(data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            key={row.id}>

                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="10"
                                                align="left">

                                                {row.Item}
                                            </TableCell>
                                            <TableCell align="left">{row.Amount}</TableCell>
                                            <TableCell align="left">{row.Date}</TableCell>
                                            <TableCell align="left">{row.Category}</TableCell>
                                            <TableCell align="left">
                                                <ActionButton itemid={row.id}/>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}>

                                        <TableCell colSpan={5} />
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}/>

            </Paper>*/}
        </Box>
    );
}

export default ExpenseEntryItemList
