import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';

import Paper from '@mui/material/Paper';
import Standard from '../../components/Button/Standard';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import ActionButtons from '../../components/Button/ActionButtons';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(id: number, name: string) {
  return { id, name };
}

const rows = [
  createData(1, 'Frozen yoghurt'),
  createData(2, 'Ice cream sandwich'),
  createData(3, 'Eclair'),
  createData(4, 'Cupcake'),
  createData(5, 'Gingerbread'),
];

export default function CustomizedTables() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={2}></Grid>
          <Grid xs={8}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
              <Standard />
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell align='right'>Name</StyledTableCell>
                    <StyledTableCell align='right'>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component='th' scope='row'>
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align='right'>{row.name}</StyledTableCell>
                      <StyledTableCell align='right'>
                        <ActionButtons />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid xs={2}></Grid>
        </Grid>
      </Box>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <Pagination count={50} color='primary' />
      </div>
    </>
  );
}
