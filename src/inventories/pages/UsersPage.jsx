import { InventoriesLayout } from "../layout/InventoriesLayout"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Button, Card, CardContent, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import Scrollbars from 'react-custom-scrollbars';


const data = [
  { id: 1, title: 'Nombre completo del usuario 1', description: 'Descripción del elemento 1, con la información que se va a traer del usuario que se trae de la base de datos de prueba' },
  { id: 2, title: 'Nombre completo del usuario 2', description: 'Descripción del elemento 1, con la información que se va a traer del usuario que se trae de la base de datos de prueba' },
  { id: 3, title: 'Nombre completo del usuario 3', description: 'Descripción del elemento 1, con la información que se va a traer del usuario que se trae de la base de datos de prueba' },
  { id: 4, title: 'Nombre completo del usuario 4', description: 'Descripción del elemento 1, con la información que se va a traer del usuario que se trae de la base de datos de prueba' },
  { id: 5, title: 'Nombre completo del usuario 5', description: 'Descripción del elemento 1, con la información que se va a traer del usuario que se trae de la base de datos de prueba' },
];

export const UsersPage = () => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  return (
    <InventoriesLayout title='Usuarios'>
      <Grid container>
          <Grid container spacing={3}
            sx={{ 
              padding: '10px', // Aplica el padding en general
              '@media (max-width: 600px)': {
                padding: '0', // Quita el padding en pantallas más pequeñas que 600px
              },
              alignItems: 'center',
            }}
            >
              <Grid item xs={12} sm={12}>
                <Scrollbars style={{ height: '76vh' }}>
                  <Grid
                    container
                    direction="column"
                    display='flex'
                    justify='center'
                    alignContent='center'
                    alignItems='center'
                    sx={{  backgroundColor: 'rgba(64, 64, 64, 0.6)', 
                      padding: '20px', 
                      '@media (max-width: 600px)': {
                        padding: '10px',
                      }
                    }}
                    >
                    {data.map((item) => (
                      <Grid item key={item.id} sx={{ mb:{lg:2, md:2, sm:2, xs:1}}}>
                        <Card sx={{ width: '100%', height: '100%' }}>
                          <CardContent
                            sx={{
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <div>
                              <Typography 
                                variant="h4"
                                mb={2} 
                                sx={{fontWeight: 'bold', fontSize: {lg:23, md:20, xs:16}}}
                              >
                                {item.title}
                              </Typography>
                              <Typography 
                                color="textSecondary" 
                                sx={{mr:{lg:5, md:5, xs:1 }, fontSize: {lg:20, md:15, xs:12}}}
                                >
                                {item.description}
                              </Typography>
                            </div>
                            <div sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar alt="Avatar" src="/path/to/avatar.jpg" sx={{ width: {lg:56, md:40 }, height: {lg:56, md:40} }} />
                            </div>
                            <div>
                              <IconButton onClick={handleMenuClick} sx={{ mr: {lg:2, md:2 , xs:-2} }}>
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
          </Grid>
        </Grid>
    </InventoriesLayout>
  )
}

