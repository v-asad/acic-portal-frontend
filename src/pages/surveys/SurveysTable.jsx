import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom/';

function createData(id, title, created_by, createdAt, responses) {
    return { id, title, created_by, createdAt, responses };
}

const rows = [
    createData(84564564, 'Annual Dinner Venue', 'Convener 1', new Date().toDateString(), 400),
    createData(98764564, 'Exam Survey', 'Convener 1', new Date().toDateString(), 139)
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
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

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

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'id',
        align: 'left',
        disablePadding: false,
        label: 'ID'
    },
    {
        id: 'title',
        align: 'left',
        disablePadding: true,
        label: 'Title'
    },
    {
        id: 'responses',
        align: 'center',
        disablePadding: true,
        label: 'Responses'
    },
    {
        id: 'created_by',
        align: 'left',
        disablePadding: false,
        label: 'Created By'
    },
    {
        id: 'createdAt',
        align: 'left',
        disablePadding: false,
        label: 'Created At'
    },
    {
        id: 'actions',
        align: 'left',
        disablePadding: false,
        label: 'Actions'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function SurveysTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

SurveysTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE ||============================== //

export default function SurveysTable() {
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

    const navigate = useNavigate();

    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-child': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}
                >
                    <SurveysTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                            const isItemSelected = isSelected(row.trackingNo);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.trackingNo}
                                    selected={isItemSelected}
                                >
                                    <TableCell component="th" id={labelId} scope="row" align="left">
                                        <Link color="secondary" component={RouterLink} to={`/surveys/${row.id}`}>
                                            {row.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">{row.title}</TableCell>
                                    <TableCell align="center">
                                        <NumberFormat value={row.responses} displayType="text" thousandSeparator />
                                    </TableCell>
                                    <TableCell align="left">{row.created_by}</TableCell>
                                    <TableCell align="left">{row.createdAt}</TableCell>
                                    <TableCell align="left">
                                        <Box>
                                            <IconButton color="info" onClick={() => navigate('/surveys/' + row.id)}>
                                                <EyeOutlined />
                                            </IconButton>
                                            <IconButton color="info" onClick={() => navigate('/surveys/edit/' + row.id)}>
                                                <EditOutlined />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => alert('Deleting ' + row.id)}>
                                                <DeleteOutlined />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
