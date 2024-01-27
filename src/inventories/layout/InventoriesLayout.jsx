import { useState } from 'react';
import { Grid, AppBar, Toolbar, Typography, IconButton, InputBase, Paper, Drawer, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemButton from '@mui/material/ListItemButton';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';


const drawerWidth = 240;

export const InventoriesLayout = ({children, window, title} ) => {

  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const formattedTime = currentTime.toLocaleTimeString();
  const [appBarOpacity, setAppBarOpacity] = useState(1);



  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Usuarios', 'Clientes', 'Pedidos', 'Proveedores', 'Productos', 'Reportes'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{ borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ListItemIcon>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: 'solid', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {index % 2 === 0 ? <InboxIcon style={{ fontSize: '40px' }} /> : <MailIcon style={{ fontSize: '40px' }} />}
                </div>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ marginTop: 'auto', alignContent: 'flex-end' }}>
        <ListItem disablePadding sx={{ borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button variant='contained' color='button'>
            <Typography>
              Cerrar sesión
            </Typography>
          </Button>
        </ListItem>
      </List>
    </div>
  );
  

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (

    <Box display='flex' spacing={0} justify='center' alignContent='center' alignItems='center'
      sx={{  minHeight: '100vh', backgroundColor: 'background.main'}}
      >
      <CssBaseline />

      {/* Sección del Encabezado con el nombre del módulo y menú hamburguesa */}
      <AppBar position="fixed" elevation={20} className="custom-bar"
        sx={{
          zIndex: 1201,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          background: `rgba(205, 205, 205, ${appBarOpacity})`, // Ajusta la opacidad aquí
          transition: 'background 0.5s',
        }}
        >
        <Toolbar borderRadius={4}>
          <IconButton color="inherit" aria-label="open drawer" edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
              </IconButton>
            <Typography color='primary' textAlign='center' justifyContent='center' justifyItems='center' variant="h4" 
              sx={{ flexGrow: 1 , fontWeight: 'bold', fontSize: {lg: 30, md:25, xs: 20 }}}
            >
            <PersonIcon sx={{ fontSize: {lg: 35, md:30, sm:25, xs: 20 } ,mr:2 }} />
              {title}
            </Typography>
        </Toolbar>
      </AppBar>


      <Box component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
               width: drawerWidth, 
               backgroundColor: 'rgba(15, 73, 87, 0.6)', // Cambia el color de fondo según tus necesidades
              },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
      <Toolbar />

      {/* Sección de acciones y buscador */}
      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
        <Grid item xs={4} sm={2} borderRadius={4} className="custom-bar" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          {/* Acciones */}
          <IconButton sx={{ mr: 5 , color:'green'}}>
            <PersonAddIcon />
          </IconButton>
          <IconButton sx={{ color: 'cadetblue'}}>
            <EditIcon />
          </IconButton>
          {/* Agrega más botones según sea necesario */}
        </Grid>
        <Grid item xs={8} sm={7} borderRadius={4} className="custom-bar">
          {/* Buscador */}
          <Paper component="form" sx={{ p: '2px 20px', display: 'flex', alignItems: 'center', width: '100%', backgroundColor: 'transparent', borderRadius: 4 }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'buscar' }}
            />
            <IconButton type="submit" sx={{ p: '7px' }} aria-label="buscar">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
        
      {/* Contenido por página*/}
      {children}  
      
      {/*Grid del fotter */}
      <Grid container>
        <Grid item xs={12} mt={{lg:1, md: 1, sm: 2, xs:2}} sx={{ display: 'flex', justifyContent: 'space-between'}}>
            {/* Pie de página */}
            <Typography variant="body2" color="textSecondary" textAlign='center'>
              VERSION 1.0
            </Typography>
            <Typography variant="body2" color="textSecondary" textAlign='center'>
              © 2024 Tu Compañía. Todos los derechos reservados.
            </Typography>
            <Typography variant="body2" color="textSecondary" textAlign='center'>
              {formattedTime}
            </Typography>
        </Grid>
      </Grid>
        
      </Box>
    </Box>
  );
}

InventoriesLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

