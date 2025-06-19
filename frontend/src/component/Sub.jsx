// Sidebar.tsx
import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar() {

  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' ,borderRight: 'none'},
      }}
    >
      <Toolbar />
      <List>
        <ListItem>
          <ListItemText primary="수온이💧" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItem>

        <ListItem>
          <ListItemText primary="🔹메인" secondaryTypographyProps={{ fontSize: 12, color: 'gray' }} />
        </ListItem>

        <ListItem button>
          <ListItemIcon><HomeIcon sx={{ color: '#1976d2' }} /></ListItemIcon>
          <ListItemText primary="홈" onClick={() => navigate('/')}/>
        </ListItem>

        <ListItem button>
          <ListItemIcon><SettingsIcon sx={{ color: '#1976d2' }} /></ListItemIcon>
          <ListItemText primary="환경설정" />
        </ListItem>

        <ListItem>
          <ListItemText primary="🔹환경" secondaryTypographyProps={{ fontSize: 12, color: 'gray' }} />
        </ListItem>

        <ListItem button>
          <ListItemIcon><PersonAddIcon sx={{ color: '#1976d2' }}  /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        <ListItem button>
          <ListItemIcon><LoginIcon sx={{ color: '#1976d2' }} /></ListItemIcon>
          <ListItemText primary="Sign In" />
        </ListItem>
      </List>
    </Drawer>
  );
}
