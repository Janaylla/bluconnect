import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { CustomRouteMain } from "../../router/router";
import ResponsiveMenu from "../../components/Menu";
import { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Help } from "../../components/Menu/Help";
import { Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import DialogLog from "../../components/Log/Log";
const drawerWidth = 240;

interface ResponsiveDrawerProps {
  children: React.ReactNode;
  routes: CustomRouteMain[];
}
function ResponsiveDrawer({ children, routes }: Readonly<ResponsiveDrawerProps>) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const [openHelp, setOpenHelp] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isAuthenticated = localStorage.getItem("token"); // Verifica se o usuário está autenticado

  const [openDialog, setOpenDialog] = useState(false);
  

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o estado de autenticação
    window.location.reload(); // Pode ser usado para recarregar a página e redirecionar para Home
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Abre o menu
  };

  const handleCloseMenu = () => {
    setAnchorEl(null); // Fecha o menu
  };
  return (
    <Box sx={{ display: "flex", width: '100%', minHeight: '100vh', overflow: 'auto' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            flexGrow={1}
            display='flex'
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography variant="h6" noWrap component="div">
              BluConnect
            </Typography>
            <Box sx={{
              display: 'flex'
            }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => setOpenHelp(true)}
              >
                <HelpOutlineIcon />
              </IconButton>
              <Help open={openHelp} onClose={() => setOpenHelp(false)} />{/* Menu para Usuários Logados */}
              {isAuthenticated && (
                <div>
                  <IconButton
                    color="inherit"
                    aria-label="user menu"
                    onClick={handleMenuClick}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={() => setOpenDialog(true)}>Log</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <ResponsiveMenu
        mobileOpen={mobileOpen}
        routes={routes}
        setIsClosing={setIsClosing}
        setMobileOpen={setMobileOpen}
      />
      <DialogLog
        onClose={() => setOpenDialog(false)}
        open={openDialog}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)`, md: '100%', lg: '100%' },
        }}
        width={'100%'}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
