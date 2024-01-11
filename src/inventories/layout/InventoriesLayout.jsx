import { useEffect, useState } from 'react';
import { Grid, AppBar, Toolbar, Typography, Button, IconButton, InputBase, Paper, Card, CardContent, Avatar, Menu, MenuItem, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Scrollbars from 'react-custom-scrollbars';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';

const data = [
  { id: 1, title: 'Nombre completo del usuario 1', description: 'Descripción del elemento 1, con la información que se va a traer del usuario que se trae de la base de datos de prueba' },
  { id: 2, title: 'Nombre completo del usuario 2', description: 'Descripción del elemento 1, con la información que se va a traer del usuario que se trae de la base de datos de prueba' },
  { id: 3, title: 'Nombre completo del usuario 3', description: 'Descripción del elemento 1, con la información que se va a traer del usuario que se trae de la base de datos de prueba' },
  { id: 4, title: 'Nombre completo del usuario 4', description: 'Descripción del elemento 1, con la información que se va a traer del usuario que se trae de la base de datos de prueba' },
  { id: 5, title: 'Nombre completo del usuario 5', description: 'Descripción del elemento 1, con la información que se va a traer del usuario que se trae de la base de datos de prueba' },
];

export const InventoriesLayout = () => {

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Esta función se ejecutará después de que el componente se monte
    const intervalId = setInterval(() => {
      // Actualiza el estado con la hora actual
      setCurrentTime(new Date());
    }, 1000); // Actualiza cada segundo

    // Esta función se ejecutará antes de que el componente se desmonte
    return () => {
      clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    };
  }, []); // El array vacío asegura que useEffect se ejecute solo después del montaje inicial

  const formattedTime = currentTime.toLocaleTimeString();

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Grid
      container
      display='flex'
      spacing={0}
      justify='center'
      alignContent='center'
      alignItems='center'
      sx={{ minHeight: '100vh', backgroundColor: 'background.main', padding: 1 }}
    >
      <Grid container direction="column" >
        {/* Encabezado con el nombre del módulo y menú hamburguesa */}
        <AppBar position="static" color="transparent" elevation={1} className="custom-bar">
          <Toolbar borderRadius={4}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              color='primary' 
              textAlign='center' 
              justifyContent='center'
              justifyItems='center' 
              variant="h4" 
              fontWeight='bold' 
              sx={{ flexGrow: 1 }}
            >
            <PersonIcon sx={{ fontSize: 30 ,mr:2 }} />
              Usuarios
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Menú lateral (Drawer) */}
        <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItem>
            {/* Agrega más elementos de menú según sea necesario */}
          </List>
        </Drawer>

       {/* Sección de acciones y buscador */}
        <Grid container spacing={0} sx={{ padding: 2, alignItems: 'center', justifyContent: 'space-evenly' }}>
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

        {/* Navegación y lista de información */}
        <Grid container spacing={2} sx={{ padding: 2, alignItems: 'center' }}>
          <Grid item xs={12} sm={9}>
            <Scrollbars style={{ height: '65vh' }}>
              <Grid
                container
                direction="column"
                display='flex'
                justify='center'
                alignContent='center'
                alignItems='center'
                sx={{ minHeight: '100vh', backgroundColor: 'rgba(64, 60, 61, 0.7)', padding: 3 }}
              >
                {data.map((item) => (
                  <Grid item key={item.id} mb={2} xs={12}>
                    <Card sx={{ width: '100%', height: '100%' }}>
                      <CardContent
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <Typography variant="h6" component="div" mr={10}>
                            {item.title}
                          </Typography>
                          <Typography color="textSecondary" mr={5}>
                            {item.description}
                          </Typography>
                        </div>
                        <div sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar alt="Avatar" src="/path/to/avatar.jpg" sx={{ width: 56, height: 56 }} />
                        </div>
                        <div>
                          <IconButton onClick={handleMenuClick} sx={{ mr: 2 }}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            <MenuItem onClick={handleMenuClose}>Opción 1</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Opción 2</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Opción 3</MenuItem>
                          </Menu>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Scrollbars>
          </Grid>

          <Grid item xs={12} sm={3}>
            {/* Botonera de navegación de módulos */}
            <Button variant="outlined" fullWidth>
              Módulo 1
            </Button>
            <Button variant="outlined" fullWidth>
              Módulo 2
            </Button>
            <Button variant="outlined" fullWidth>
              Módulo 3
            </Button>
            {/* Agrega más botones de navegación según sea necesario */}
          </Grid>

          <Grid item xs={12} mt={2} sx={{ display: 'flex', justifyContent: 'space-between'}}>
            {/* Pie de página */}
            <Typography variant="body2" color="textSecondary" textAlign='center'>
              VERSION 1.1
            </Typography>
            <Typography variant="body2" color="textSecondary" textAlign='center'>
              © 2024 Tu Compañía. Todos los derechos reservados.
            </Typography>
            <Typography variant="body2" color="textSecondary" textAlign='center'>
              {formattedTime}
            </Typography>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  )
}