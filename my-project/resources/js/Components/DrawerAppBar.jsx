import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from '@inertiajs/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = useState(null); // null means no user logged in

  const loginUser = (id, username, role) => {
      setUser({ id, username, role });
  };

  const logoutUser = () => {
      setUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        DapperDev
      </Typography>
      <Divider />
      <List>
        {/* Render only Home, and conditionally Register Login if not logged in */}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link href="/items" style={{ color: 'inherit', textDecoration: 'none' }}>
              <ListItemText primary="Items" />
            </Link>
          </ListItemButton>
        </ListItem>

          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Link href="/categories" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <ListItemText primary="Categories" />
                </Link>
              </ListItemButton>
              </ListItem>

          </>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
            >
            DapperDev          
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button sx={{ color: '#fff' }}>
                <Link href="/items" style={{ color: 'inherit', textDecoration: 'none' }}>Items</Link>
              </Button>

              <Button sx={{ color: '#fff' }}>
                <Link href="/categories" style={{ color: 'inherit', textDecoration: 'none' }}>Categories</Link>
              </Button>


            </Box>
          </Toolbar>
        </AppBar>
        <>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
          >
            {drawer}
          </Drawer>
        </>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
