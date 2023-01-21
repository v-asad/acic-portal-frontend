import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

function createData(id, title, created_by, createdAt, responses) {
    return { id, title, created_by, createdAt, responses };
}

const rows = [
    createData(84564564, 'Camera Lens', 'Convener 1', new Date().toDateString(), 40570),
    createData(98764564, 'Laptop', 'Convener 1', new Date().toDateString(), 180139),
    createData(98756325, 'Mobile', 'Convener 1', new Date().toDateString(), 90989),
    createData(98652366, 'Handset', 'Convener 1', new Date().toDateString(), 10239),
    createData(13286564, 'Computer Accessories', 'Convener 1', new Date().toDateString(), 83348),
    createData(86739658, 'TV', 'Convener 1', new Date().toDateString(), 410780),
    createData(13256498, 'Keyboard', 'Convener 1', new Date().toDateString(), 70999),
    createData(98753263, 'Mouse', 'Convener 1', new Date().toDateString(), 10570),
    createData(98753275, 'Desktop', 'Convener 1', new Date().toDateString(), 98063),
    createData(98753291, 'Chair', 'Convener 1', new Date().toDateString(), 14001)
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
        id: 'responses',
        align: 'right',
        disablePadding: false,
        label: 'Responses'
    },
    {
        id: 'actions',
        align: 'left',
        disablePadding: false,
        label: 'Actions'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
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

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Pending';
            break;
        case 1:
            color = 'success';
            title = 'Approved';
            break;
        case 2:
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

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
                    <OrderTableHead order={order} orderBy={orderBy} />
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
                                    <TableCell align="left">{row.created_by}</TableCell>
                                    <TableCell align="left">{row.createdAt}</TableCell>
                                    {/* <TableCell align="left">
                                        <OrderStatus status={row.createdAt} />
                                    </TableCell> */}
                                    <TableCell align="right">
                                        <NumberFormat value={row.responses} displayType="text" thousandSeparator />
                                    </TableCell>
                                    <TableCell align="left">
                                        <Box>
                                            <IconButton color="info">
                                                <EyeOutlined />
                                            </IconButton>
                                            <IconButton color="success">
                                                <EditOutlined />
                                            </IconButton>
                                            <IconButton color="error">
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
