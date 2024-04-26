import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';




function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };




const rows = [
  createData('Frozen yoghurt', 159, 6.0, 'Active', 0),
  createData('Ice cream sandwich', 237, 9.0, 'Active', 1),
  createData('Eclair', 262, 16.0, 'Blocked', 2),
  createData('Cupcake', 305, 3.7, 'Blocked', 3),
  createData('Gingerbread', 356, 16.0, 'Active', 4),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Checkbox {...label} /></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>e-Mail</TableCell>
            <TableCell align="right">Last login</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell><Checkbox {...label} /></TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}