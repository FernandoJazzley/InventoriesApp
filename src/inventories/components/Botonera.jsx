import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import { AccountCircle, Business, ShoppingCart, ListAlt, People, Store } from '@mui/icons-material';
import {Toolbar,Typography, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const StyledIconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Botonera = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
      };
    

  return (
    <div>
    <Toolbar />
    <Divider />
    <List>
      {[
        { text: 'Usuarios', icon: <AccountCircle fontSize='large'/>, path: '/usuarios'},
        { text: 'Clientes', icon: <People fontSize='large'/>, path: '/clientes' },
        { text: 'Pedidos', icon: <ShoppingCart fontSize='large'/>, path: '/pedidos' },
        { text: 'Proveedores', icon: <Business fontSize='large'/>, path: '/proveedores' },
        { text: 'Productos', icon: <Store fontSize='large'/>, path: '/productos' },
        { text: 'Reportes', icon: <ListAlt fontSize='large'/>, path: '/reportes' },
      ].map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
          key={item.text}
            component={NavLink}
            to={item.path}
            exact
            selected={isActive(item.path)} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            color: isActive(item.path) ? 'white' : 'black', // Cambia 'white' al color deseado
            '&.Mui-selected': {
              backgroundColor: 'rgba(140, 105, 84, 0.7)',
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white', // Cambia el color del icono al pasar el ratón
              },
              pointerEvents: 'none', // Deshabilita la interacción del mouse cuando está seleccionado
            },
            '&:hover': {
            backgroundColor: '#0F4957',
            color: 'white',
            '& .MuiListItemIcon-root': {
              color: 'white', // Cambia el color del icono al pasar el ratón
            },
          },
            }}
          >
            <ListItemIcon>
            <StyledIconContainer
              key={item.text}
              isActive={isActive(item.path)}
            >
              {item.icon}
            </StyledIconContainer>
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List sx={{ marginTop: 'auto', alignContent: 'flex-end' }}>
      <ListItem disablePadding sx={{ borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button variant='contained' color='button' 
          sx={{border: '1px solid #403C3D',
                '&:hover': {
                border: '1px solid #0F4957',
                backgroundColor: '#0F4957',   // Cambio de color de fondo al pasar el ratón
                color: 'white',             // Cambio de color del texto al pasar el ratón
                },
              }}
              onClick={
                () => navigate('/auth/login')
              }
        >
          <Typography sx={{fontSize: 10}}>
            Cerrar sesión
          </Typography>
        </Button>
      </ListItem>
    </List>
  </div>
  )
}

