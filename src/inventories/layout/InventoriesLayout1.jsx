import { useEffect, useState } from 'react';
import { Grid, AppBar, Toolbar, Typography, IconButton, InputBase, Paper, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';

export const InventoriesLayout = ( {children, title}) => {

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

  const [drawerOpen, setDrawerOpen] = useState(false);


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
      sx={{ minHeight: '100vh', backgroundColor: 'background.main', padding: 2 }}
    >

    {/*Grid del encabezado*/}
      <Grid container>
        {/* Grid del Encabezado con el nombre del módulo y menú hamburguesa */}
        <Grid container margin={2}>
          <AppBar position="static" color="transparent" elevation={5} className="custom-bar">
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
                sx={{ flexGrow: 1 , fontWeight: 'bold', fontSize: {lg: 30, md:25, xs: 20 }}}

              >
              <PersonIcon sx={{ fontSize: {lg: 35, md:30, sm:25, xs: 20 } ,mr:2 }} />
                {title}
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Menú lateral (Drawer) */}
          <Drawer
            anchor='left'
            open={drawerOpen}
            onClose={toggleDrawer}
            sx={{ width: '600px', backgroundColor: 'primary.main' }}
            PaperProps={{ style: { backgroundColor: '#CACACA', width: '250px' } }}
          >
            <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <ListItem button sx={{color: 'red', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                
                <ListItemIcon>
                  <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText>
                  <Typography >
                    aa
                  </Typography>
                </ListItemText>

              </ListItem>
              {/* Agrega más elementos de menú según sea necesario */}
            </List>
          </Drawer>
        </Grid>


       {/* Sección de acciones y buscador */}
        <Grid container margin={2} sx={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
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
      </Grid>
        
      {/* Contenido por página*/}
      {children}  
      
      {/*Grid del fotter */}
      <Grid container>
        <Grid item xs={12} margin={2} sx={{ display: 'flex', justifyContent: 'space-between'}}>
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
      
    </Grid>
  )
}