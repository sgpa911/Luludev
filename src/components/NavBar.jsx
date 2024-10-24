import React, { useState } from 'react';
import { AppBar, Box, Toolbar, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material'; // Hamburger menu icon
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State to manage the drawer open/close state
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Explore', path: '/explore' },
    { text: 'Navigate', path: '/navigate' },
    { text: 'Report Bugs', path: '/report-bugs' },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0, background: '#21005D' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Left Hamburger Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: isMobile ? 'block' : 'none' }}
          >
            <MenuIcon />
          </IconButton>

          {/* Centered Logo with Link to Homepage */}
          <Link to={'/'} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Box
              component="img"
              src="https://seeklogo.com/images/L/lulu-mall-thiruvananthapuram-logo-BA3DE67AAC-seeklogo.com.png"
              alt="Lulu Logo"
              sx={{
                height: 50,
                cursor: 'pointer',
              }}
            />
          </Link>

          {/* Right Spacer for Flex Balance */}
          <Box sx={{ width: isMobile ? '40px' : '64px' }} />

          {/* Drawer (Sidebar) */}
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                {menuItems.map((item, index) => (
                  <ListItem button component={Link} to={item.path} key={index}>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
