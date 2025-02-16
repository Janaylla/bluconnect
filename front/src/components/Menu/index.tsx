import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { CustomRouteMain } from "../../router/router";
import Toolbar from "@mui/material/Toolbar";
import { Box, Drawer } from "@mui/material";
import { useEffect, useState } from "react";

const drawerWidth = 240;

interface MenuProps {
  routes: CustomRouteMain[];
  setIsClosing: (value: boolean) => void;
  setMobileOpen: (value: boolean) => void;
  mobileOpen: boolean;
}

function ResponsiveMenu({
  routes,
  setIsClosing,
  setMobileOpen,
  mobileOpen,
}: Readonly<MenuProps>) {
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  
  const [selectedRoute, setSelectedRoute] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação

  useEffect(() => {
    setSelectedRoute(window.location.href);
    setIsAuthenticated(!!localStorage.getItem("token")); // Verificar se está autenticado
  }, [window.location.href]);

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const baseUrl = window.location.origin;

  // Criar um menu com rotas comuns e rotas administrativas
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {routes.map((route) => (
          <div key={route.path}>
            {route.routes.map((routeChildren) => {
              // Exibir rotas comuns para usuários não autenticados e todas as rotas para autenticados
              if (!routeChildren.showInMenu) return null;

              // Condição para rotas administrativas
              if (route.path === "admin" && !isAuthenticated) return null;

              const href =
                baseUrl +
                (route.path ? "/" : "") +
                route.path +
                (routeChildren.path ? "/" : "") +
                routeChildren.path;

              return (
                <ListItem key={routeChildren.path} disablePadding>
                  <ListItemButton
                    sx={{
                      backgroundColor: selectedRoute === href ? 'lightgrey' : 'transparent',
                    }} 
                    component="a" 
                    href={href}>
                    <ListItemText primary={routeChildren.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Melhor desempenho ao abrir em dispositivos móveis.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default ResponsiveMenu;
