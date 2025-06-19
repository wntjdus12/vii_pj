// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';


function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#a0c4ff', boxshadow: 'none', alignItems: 'center'}}>
      <Toolbar sx={{ justifyContent: 'space-around', borderBottom: '1px solid #FFFFFF', width: '60%', }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>수온이</Typography>
        <Box>
          <Button color="inherit">DASHBOARD</Button>
          <Button color="inherit">PROFILE</Button>
          <Button color="inherit">SIGN UP</Button>
          <Button color="inherit">SIGN IN</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
