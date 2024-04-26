import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DataTable from './components/table';
import BasicTable from './components/table';
import {Button, Link} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useParams } from "react-router-dom";
import EmployeeTable from './components/table copy';




export default function DenseAppBar() {
  const { userName } = useParams()
  const name = userName;

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tabel of users
          </Typography>
          <Typography variant="body1" gutterBottom sx={{fontSize: '15px', paddingTop: 1, paddingRight: 5}}>
            Hello, <span style={{ textDecoration: 'underline' }}>{name}</span>!
      </Typography>
          <Link href="/" color="inherit" underline="hover" sx={{fontSize: '15px'}}>Logout</Link>
        </Toolbar>
      </AppBar>
      <Box sx={{
        marginTop: 6,
        marginLeft: 6,
        marginRight: 6,

      }}>
        <Button variant="outlined" startIcon={<LockIcon />} sx={{
        marginRight: 1,
      }}>Block</Button>
        <Button variant="outlined"   startIcon={<LockOpenIcon />} size="large" sx={{
        paddingRight: 1.5,
        marginRight: 1,
      }}>
        </Button>
        <Button variant="contained"  color='error' size="large" startIcon={<DeleteIcon />} sx={{
        paddingRight: 1.5,}}></Button>
      </Box >
      <Box sx={{
        marginTop: 1,
        marginLeft: 6,
        marginRight: 6,
      }}>
        <EmployeeTable />
      {/* <BasicTable /> */}
      </Box>
    </Box>
  );
}