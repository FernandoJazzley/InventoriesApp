import { InventoriesLayout } from "../layout/InventoriesLayout"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Card, CardContent, Grid, IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import Scrollbars from 'react-custom-scrollbars';
import styled from 'styled-components';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const data = [
  { id: 1, title: 'Fernando Jacinto Palacios', description: 'Descripción del elemento 1, con la información que se va a traer del usuario que se trae de la base de datos de prueba' },
  { id: 2, title: 'Nombre completo del usuario 2', description: 'Descripción del elemento 1, con la información que se va a traer del usuario que se trae de la base de datos de prueba' },
  { id: 3, title: 'Nombre completo del usuario 3', description: 'Descripción del elemento 1, con la información que se va a traer del usuario que se trae de la base de datos de prueba' },
  { id: 4, title: 'Nombre completo del usuario 4', description: 'Descripción del elemento 1, con la información que se va a traer del usuario que se trae de la base de datos de prueba' },
  { id: 5, title: 'Nombre completo del usuario 5', description: 'Descripción del elemento 1, con la información que se va a traer del usuario que se trae de la base de datos de prueba' },
];

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CustomMenu = styled(Menu)`
  .MuiPaper-root {
    background-color: #CACACA;
    border-radius: 4px;
  }

  .MuiMenuItem-root {
    &:hover {
      background-color: #0F4957; // Color diferente al pasar el ratón sobre el botón del menú
      color: #FFFFFF; // Cambiar el color del texto al pasar el ratón sobre el botón del menú
    }
  }
`;

// Define estilos personalizados para el primer icono (Ver +)
const ViewMenuItem = styled(MenuItem)`
  .MuiSvgIcon-root {
    color: cadetblue; // Cambia el color del primer icono aquí
  }

  &:hover {
    .MuiSvgIcon-root {
      color: lightblue; // Cambia el color del primer icono al pasar el ratón
    }
  }
`;

// Define estilos personalizados para el segundo icono (Eliminar)
const DeleteMenuItem = styled(MenuItem)`
  .MuiSvgIcon-root {
    color: #e53935; // Cambia el color del segundo icono aquí
  }

  &:hover {
    .MuiSvgIcon-root {
      color: red; // Cambia el color del segundo icono al pasar el ratón
    }
  }
`;

export const UsersPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData.id === selectedCard ? null : cardData);
  };

  return (
    <InventoriesLayout title='Usuarios' searchText={searchText} onSearchChange={handleSearchChange} selectedCard={selectedCard}>
      <Grid container>
        <Grid container spacing={3} sx={{ padding: '10px', alignItems: 'center' }}>
          <Grid item xs={12} sm={12}>
            <Scrollbars style={{ height: '76vh' }}>
              <Grid
                container
                direction="column"
                display='flex'
                justify='center'
                alignContent='center'
                alignItems='center'
                sx={{
                  backgroundColor: 'rgba(64, 64, 64, 0.6)',
                  padding: '20px',
                  '@media (max-width: 600px)': {
                    padding: '10px',
                  },
                }}
              >
                {data
                  .filter(
                    (item) =>
                      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                      item.description.toLowerCase().includes(searchText.toLowerCase())
                  )
                  .map((item) => (
                    <Grid item key={item.id} sx={{ mb: { lg: 2, md: 2, sm: 2, xs: 1 } }}>
                      <Card
                        sx={{
                          width: '100%',
                          height: '100%',
                          border: selectedCard && selectedCard.id === item.id ? '2px solid green' : '2px solid transparent',
                        }}
                        onClick={() => handleCardClick(item)}
                      >
                        <CardContent
                          sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <Typography variant="h4" mb={2} sx={{ fontWeight: 'bold', fontSize: { lg: 23, md: 20, xs: 16 } }}>
                              {item.title}
                            </Typography>
                            <Typography
                              color="textSecondary"
                              sx={{ mr: { lg: 5, md: 5, xs: 1 }, fontSize: { lg: 20, md: 15, xs: 12 } }}
                            >
                              {item.description}
                            </Typography>
                          </div>
                          <StyledContainer>
                            <Avatar alt="Avatar" src="/path/to/avatar.jpg" sx={{ width: { lg: 56, md: 40 }, height: { lg: 56, md: 40 } }} />
                          </StyledContainer>
                          <div>
                            <IconButton onClick={handleMenuClick} sx={{ mr: { lg: 2, md: 2, xs: -2 } }}>
                              <MoreVertIcon />
                            </IconButton>
                            <CustomMenu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleMenuClose}
                            >
                              <ViewMenuItem onClick={handleMenuClose}>
                                <ListItemIcon>
                                  <VisibilityIcon color='blue' fontSize="small" />
                                </ListItemIcon>
                                Ver +
                              </ViewMenuItem>
                              <DeleteMenuItem onClick={handleMenuClose}>
                                <ListItemIcon>
                                  <DeleteIcon fontSize="small" />
                                </ListItemIcon>
                                Eliminar
                              </DeleteMenuItem>
                              </CustomMenu>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Scrollbars>
          </Grid>
        </Grid>
      </Grid>
    </InventoriesLayout>
  )
}