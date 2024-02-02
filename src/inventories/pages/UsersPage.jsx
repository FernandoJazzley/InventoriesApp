import { InventoriesLayout } from "../layout/InventoriesLayout"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Button, Card, CardContent, Grid, IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Scrollbars from 'react-custom-scrollbars';
import styled from 'styled-components';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import inventoriesApi from '../../api/inventoriesApi'
import image from '../../assets/usersImages/perfil.png'
import { AccountCircle } from "@mui/icons-material";

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

  useEffect (() => {

    const fetchData = async () => {
      try {
        const {data} = await inventoriesApi.get('/inventories/users/');
       console.log(data)
        console.log(data.users);
        setUserData(data.users);
      } catch (error) {
        console.log(error)
        console.error('Error al obtener datos de la base de datos:', error);
      }
    };

    fetchData();
  }, []); 

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

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  return (
    <InventoriesLayout title='Usuarios' searchText={searchText} onSearchChange={handleSearchChange} selectedCard={selectedCard} icon={<AccountCircle />}>
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