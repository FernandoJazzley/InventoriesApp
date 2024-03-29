import React, { useState } from 'react';
import { Grid, AppBar, Toolbar, Typography, IconButton, InputBase, Paper, Drawer } from '@mui/material';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { Botonera, FormAdd } from '../components';
import Swal from 'sweetalert2';


const drawerWidth = 200;

export const InventoriesLayout = ({children, window, title, display ,searchText, onSearchChange, selectedCard, icon ,updateUsersList}) => {

  const [currentTime] = useState(new Date());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [appBarOpacity] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  const handleSearch = (e) => {
    onSearchChange(e); // Asegúrate de pasar el evento al onSearchChange
  };


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

  const openModal = (event) => {
    // Deseleccionar la tarjeta al abrir el modal
    setSelectedUser(null);

    // Verificar si es el botón de agregar o editar
    if (event && event.currentTarget.id === 'add-button') {
      setModalOpen(true);
    } else {
      // Si es editar, establecer el usuario seleccionado y abrir el modal
      setSelectedUser(selectedCard);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
  }, [searchText]);


  const handleEditButtonClick = () => {
    // Realiza acciones específicas para editar la tarjeta seleccionada
    if (selectedCard) {
      setSelectedUser(selectedCard);
      openModal();
    } else {
      Swal.fire({
        title: "¡Alerta!",
        text: "Por favor selecciona un usuario para editar",
        icon: "warning",
        iconColor: '#D35400',
        color: 'black',
        background: '#AAB7B8',
        confirmButtonColor: 'green',
      }).then((result) => {
        // Verifica si se hace clic en el botón "OK" o se cierra la alerta
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
          // Recarga la página
          console.log('')
        }
      });
    }
  };

  const formattedTime = currentTime.toLocaleTimeString();
  
  const container = window !== undefined ? () => window().document.body : undefined;

  return (

    <Box display='flex' spacing={0} justify='center' alignContent='center' alignItems='center'
      sx={{  minHeight: '100vh', backgroundColor: 'background.main'}}
      >
      <CssBaseline />

      {/* Sección del Encabezado con el nombre del módulo y menú hamburguesa */}
      <AppBar
        position="fixed"
        elevation={20}
        className="custom-bar"
        sx={{
          zIndex: 1201,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          background: `rgba(205, 205, 205, ${appBarOpacity})`,
          transition: 'background 0.5s',
        }}
      >
        <Toolbar borderRadius={4}>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            color="primary"
            textAlign="center"
            justifyContent="center"
            justifyItems="center"
            variant="h4"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              fontSize: { lg: 30, md: 25, xs: 20 },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {icon && React.cloneElement(icon, { sx: { fontSize: { lg: 35, md: 30, sm: 25, xs: 20 }, mr: 2 } })}
            {title}
          </Typography>
        </Toolbar>
      </AppBar>


      <Box component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              background: '#CACACA',
            },
          }}
        >
          <div style={{ backgroundColor: 'rgba(15, 73, 87, 0.6)', padding: '20px' }}>
          <Botonera/>
          </div>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
               width: drawerWidth, 
               backgroundColor: 'rgba(15, 73, 87, 0.6)',
              },
          }}
          open
        >
          <Botonera/>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
      <Toolbar />
      <Grid display={display} container sx={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
        <Grid item xs={4} sm={2} borderRadius={4} className="custom-bar" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          {/* Acciones */}
          <IconButton sx={{ mr: 5 , color:'green'}} onClick={(e) => openModal(e)} id="add-button">
            <PersonAddIcon />
          </IconButton>
            <FormAdd open={isModalOpen} handleClose={closeModal} selectedUser={selectedUser} updateUsersList={updateUsersList}/>
          <IconButton sx={{ color: 'cadetblue'}} onClick={handleEditButtonClick}>
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid item xs={8} sm={7} borderRadius={4} className="custom-bar">
          {/* Buscador */}
          <Paper component="form" 
            sx={{ p: '2px 20px', display: 'flex', alignItems: 'center', width: '100%', backgroundColor: 'transparent', borderRadius: 4 }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'buscar' }}
              value={searchText}
              onChange={handleSearch}
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
  window: PropTypes.func,
  title: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

