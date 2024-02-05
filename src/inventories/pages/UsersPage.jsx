import React, { useState } from 'react';
import { InventoriesLayout } from "../layout/InventoriesLayout";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Button, Card, CardContent, Grid, IconButton, ListItemIcon, Menu, MenuItem, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useEffect } from "react";
import Scrollbars from 'react-custom-scrollbars';
import styled from 'styled-components';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import inventoriesApi from '../../api/inventoriesApi'
import image from '../../assets/usersImages/perfil.png';
import { AccountCircle } from "@mui/icons-material";
import Swal from 'sweetalert2';

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
      background-color: #0F4957;
      color: #FFFFFF; 
    }
  }
`;

const ViewMenuItem = styled(MenuItem)`
  .MuiSvgIcon-root {
    color: cadetblue; 
  }

  &:hover {
    .MuiSvgIcon-root {
      color: lightblue; 
    }
  }
`;

const DeleteMenuItem = styled(MenuItem)`
  .MuiSvgIcon-root {
    color: #e53935; 
  }

  &:hover {
    .MuiSvgIcon-root {
      color: red; 
    }
  }
`;

export const UsersPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [userData, setUserData] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedPopupData, setSelectedPopupData] = useState(null);

  useEffect (() => {
    const fetchData = async () => {
      try {
        const {data} = await inventoriesApi.get('/inventories/users/');
        setUserData(data.users);
      } catch (error) {
        console.error('Error al obtener datos de la base de datos:', error);
      }
    };

    fetchData();
  }, []); 

  const updateUsersList = async () => {
    try {
      const { data } = await inventoriesApi.get('/inventories/users/');
      const updatedUsers = data.users;

    // Invertir el orden de la lista de usuarios
    setUserData(updatedUsers.reverse());
    } catch (error) {
      console.error('Error al obtener datos de la base de datos:', error);
    }
  };

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

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength);
    }
    return text;
  };

  const toggleExpand = (cardId) => {
    setExpandedCardId(expandedCardId === cardId ? null : cardId);
  };

  const isCardExpanded = (cardId) => {
    return expandedCardId === cardId;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const openPopup = (cardData) => {
    setPopupOpen(true);
    setSelectedPopupData(cardData);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedPopupData(null);
  };

  const handleViewClick = () => {
    openPopup(selectedCard);
    handleMenuClose();
  };

  const handleDeleteClick = async () => {
    try {
      if (!selectedCard) {
        // No se ha seleccionado ninguna tarjeta para eliminar
        return;
      }
      handleMenuClose();
  
      await Swal.fire({
        html: `¿Está seguro de eliminar el usuario?<br/><br/><b>${selectedCard.complete_name}</b>`,
        icon: 'question',
        showCancelButton: true,
        iconColor: "#F05313",
        background: '#AAB7B8',
        confirmButtonColor: 'green',
        color: 'black',
        confirmButtonText: 'Confirmar',
        cancelButtonColor: '#590F15',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const userIdToDelete = selectedCard.id;  
            // Realizar la solicitud de eliminación
            const response = await inventoriesApi.delete(`/inventories/deleteUser/${userIdToDelete}`);
            if (response.data.ok) {
              // La eliminación fue exitosa, puedes realizar cualquier acción adicional si es necesario
              const updatedData = await inventoriesApi.get('/inventories/users/');
              setUserData(updatedData.data.users);
              setSelectedCard(null);
              Swal.fire({
                text: 'Usuario eliminado exitosamnete',
                iconColor: "#D35400",
                confirmButtonColor: "green",                color: 'black',
                background: '#AAB7B8',
                customClass: {
                  container: 'custom-swal-container', // Clase personalizada para ajustar el z-index
                },
              });
            } else {
              // Hubo un problema con la eliminación, puedes manejar el error aquí
              console.error('Error al eliminar el usuario:', response.data.msg);
            }
          } catch (error) {
            console.error('Error al eliminar el usuario:', error);
          }
        }
      });
    } catch (error) {
      console.error('Error al procesar la solicitud de eliminación:', error);
    }
  };

  return (
    <InventoriesLayout title='Usuarios' searchText={searchText} onSearchChange={handleSearchChange} selectedCard={selectedCard} icon={<AccountCircle />} updateUsersList={updateUsersList}>
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
                {userData
                  .filter(
                    (item) =>
                      item.complete_name.toLowerCase().includes(searchText.toLowerCase()) ||
                      item.branch.toLowerCase().includes(searchText.toLowerCase()) ||
                      item.birthdate.toLowerCase().includes(searchText.toLowerCase()) ||
                      item.working_hours.toLowerCase().includes(searchText.toLowerCase()) ||
                      item.profileImage.toLowerCase().includes(searchText.toLowerCase()) ||
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
                          <div style={{ overflow: 'hidden' }}>
                            <Typography variant="h4" mb={2} sx={{ fontWeight: 'bold', fontSize: { lg: 23, md: 20, xs: 16 } }}>
                              {item.complete_name}
                            </Typography>
                            <Typography
                              color="textSecondary"
                              sx={{
                                fontSize: { lg: 20, md: 15, xs: 12 },
                                mr: { lg: 3.5, md: 2.5, xs: 1.5 },
                                mb:1.5,
                                wordBreak: 'break-all',
                              }}
                            >
                              <span style={{ fontWeight: 'bold' }}>Sucursal:</span>&nbsp;
                              {item.branch}&nbsp;&nbsp;
                              <span style={{ fontWeight: 'bold' }}>Turno:</span>&nbsp;
                              {item.working_hours}&nbsp;&nbsp;
                              <span style={{ fontWeight: 'bold' }}>Cumpleaños:</span>&nbsp;
                              {formatDate(item.birthdate)}&nbsp;&nbsp;
                            </Typography>
                            <Typography
                              color="textSecondary"
                              sx={{
                                fontSize: { lg: 20, md: 15, xs: 12 },
                                overflowWrap: 'break-word',
                                mr: { lg: 3.5, md: 2.5, xs: 1.5 },
                              }}
                            >
                              {isCardExpanded(item.id) ? item.description : truncateDescription(item.description, 150)}
                              {!isCardExpanded(item.id) && item.description.length > 150 && (
                                <Button
                                  onClick={() => toggleExpand(item.id)}
                                  variant="text"
                                  size="small"
                                  sx={{ fontWeight: 'bold', textTransform: 'none' }}
                                >
                                  ... Ver más
                                </Button>
                              )}
                            </Typography>
                          </div>
                          <StyledContainer>
                            <Avatar alt="Avatar" src={item.profileImage || image} sx={{ width: { lg: 56, md: 40 }, height: { lg: 56, md: 40 } }} />
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
                              <ViewMenuItem onClick={handleViewClick}>
                                <ListItemIcon>
                                  <VisibilityIcon color='blue' fontSize="small" />
                                </ListItemIcon>
                                Ver +
                              </ViewMenuItem>
                              <DeleteMenuItem onClick={handleDeleteClick}>
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

      {/* Ventana emergente */}
      <Dialog open={isPopupOpen} onClose={closePopup} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', backgroundColor: '#0F4957', color: 'white' }}>{selectedPopupData?.complete_name}</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#CACACA', margin: 1, padding:2 }}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item mr={10}>
              {/* Agrega aquí la imagen del usuario */}
              <Avatar alt="Avatar" src={selectedPopupData?.profileImage} sx={{ width: 200, height: 200 }} />
            </Grid>
            <Grid item xs={8} sm={5}>
              {/* Agrega aquí el contenido de la tarjeta que deseas mostrar en la ventana emergente */}
              <Typography paragraph>
                <span style={{ fontWeight: 'bold' }}>Sucursal:</span> {selectedPopupData?.branch}
              </Typography>
              <Typography paragraph>
                <span style={{ fontWeight: 'bold' }}>Horario laboral:</span> {selectedPopupData?.working_hours}
              </Typography>
              <Typography paragraph>
                <span style={{ fontWeight: 'bold' }}>Fecha de nacimiento:</span> {selectedPopupData?.birthdate}
              </Typography>
              <Typography paragraph>
                <span style={{ fontWeight: 'bold' }}>Edad:</span> {selectedPopupData?.age}
              </Typography>
              <Typography paragraph>
                <span style={{ fontWeight: 'bold' }}>Sexo:</span> {selectedPopupData?.sex}
              </Typography>
              <Typography paragraph>
                <span style={{ fontWeight: 'bold' }}>Descripción:</span> {selectedPopupData?.description}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </InventoriesLayout>
  )
}