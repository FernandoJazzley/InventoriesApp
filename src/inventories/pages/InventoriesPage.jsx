import { Button, Grid, Typography } from "@mui/material"  
import PersonIcon from '@mui/icons-material/Person';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../../hooks';

export const InventoriesPage = () => {
    
  const navigate = useNavigate();
  const { startLogout } = useAuthStore();

  return (
    
    <Grid
        container
        display='flex'
        spacing={0}
        justifyContent= 'center'
        alignContent='center'
        alignItems='center'  // Agrega esta línea
        sx={{ minHeight: '100vh', backgroundColor: 'background.main', padding: 5}}
        >

         
        <Grid item  lg={9} md={12}  className='background-image-home' sx={{borderRadius: 4}}>
            <div style={{ position: 'relative', backgroundSize: 'cover', zIndex: 0 }} >
                <Grid 
                    sx={{
                        zIndex:1,
                        margin: 1,
                        padding: 1,
                        borderWidth: 3, 
                        borderColor: 'red', 
                        borderRadius: 4
                    }}
                >
                <Typography
                textAlign="center"
                color='white'
                sx={{ fontWeight: 'bold', fontSize: { lg: 40, md: 30, sm:20, xs: 15}}}
                >
                    "La herramienta más contundente en el contro del inventario es el seguimiento"
                </Typography>
                <Typography
                textAlign="end"
                variant="body1"
                sx={{
                    fontSize: { lg: 20, md: 15, sm:10, xs: 7},
                    textDecoration: 'underline',
                     color: 'white',
                    }}
                >
                SANDRA SANTAMARÍA
                </Typography>
                </Grid>
                    
            </div>   
        </Grid>  

            <Grid item lg={6} md={8}>
                      
                <Grid
                    container
                    sx={{
                        mt:5,
                        padding: 5,
                        border: 'solid', 
                        borderWidth: 3, 
                        borderColor: 'primary.main', 
                        borderRadius: 4,

                    }}
                >
                <Grid container justifyContent={'center'} spacing={5}>
                    <Grid item lg={5} md={5} xs={6}>
                        <Button 
                            variant="contained" 
                            color="button"
                            fullWidth
                            sx={{
                                fontSize: {lg: 15, xs: 10 }, 
                                mb:3,
                                border: '1px solid #403C3D',
                                '&:hover': {
                                    border: '1px solid #0F4957',
                                    backgroundColor: '#0F4957',   // Cambio de color de fondo al pasar el ratón
                                    color: 'white',             // Cambio de color del texto al pasar el ratón
                                },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center', 
                            }}
                            onClick={
                                () => navigate('/usuarios')
                            }
                        >
                            <PersonIcon sx={{ fontSize: 20, mr: 1 }} />
                            <Typography fontWeight='bold' variant='inherit'>
                            Usuarios
                            </Typography>
                        </Button>
                        <Button 
                            variant='contained' 
                            color='button'
                            fullWidth
                            sx={{
                                fontSize: {lg: 15, xs: 10 }, 
                                mb:3,
                                border: '1px solid #403C3D',
                                '&:hover': {
                                    border: '1px solid #0F4957',
                                    backgroundColor: '#0F4957',   // Cambio de color de fondo al pasar el ratón
                                    color: 'white',             // Cambio de color del texto al pasar el ratón
                                },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center', 
                            }}
                            onClick={
                                () => navigate('/clientes')
                            }
                        >                    
                            <Diversity1Icon sx={{ fontSize: 20, mr: 1 }}/>
                            <Typography fontWeight='bold' variant='inherit'>
                            Clientes
                            </Typography>
                        </Button>
                        <Button 
                            variant='contained' 
                            color='button'
                            fullWidth
                            sx={{
                                fontSize: {lg: 15, xs: 10 }, 
                                mb:3,
                                border: '1px solid #403C3D',
                                '&:hover': {
                                    border: '1px solid #0F4957',
                                    backgroundColor: '#0F4957',   // Cambio de color de fondo al pasar el ratón
                                    color: 'white',             // Cambio de color del texto al pasar el ratón
                                },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center', 
                            }}
                            onClick={
                                () => navigate('/pedidos')
                            }
                        >
                            <ShoppingCartIcon sx={{ fontSize: 20, mr: 1 }}/>
                            <Typography fontWeight='bold' variant='inherit'>
                            Pedidos
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item  lg={5} md={5} xs={6}>
                    <Button
                        variant='contained' 
                            color='button'
                            fullWidth
                            sx={{
                                fontSize: {lg: 15, xs: 10 }, 
                                mb:3,
                                border: '1px solid #403C3D',
                                '&:hover': {
                                    border: '1px solid #0F4957',
                                    backgroundColor: '#0F4957',   // Cambio de color de fondo al pasar el ratón
                                    color: 'white',             // Cambio de color del texto al pasar el ratón
                                },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center', 
                            }}
                            onClick={
                                () => navigate('/provedores')
                            }
                    >
                        <LocalShippingIcon sx={{ fontSize: 20, mr: 1 }}/>
                        <Typography fontWeight='bold' variant='inherit'>
                        Proveedores
                        </Typography>
                    </Button>
                    <Button 
                        variant='contained' 
                            color='button'
                            fullWidth
                            sx={{
                                fontSize: {lg: 15, xs: 10 }, 
                                mb:3,
                                border: '1px solid #403C3D',
                                '&:hover': {
                                    border: '1px solid #0F4957',
                                    backgroundColor: '#0F4957',   // Cambio de color de fondo al pasar el ratón
                                    color: 'white',             // Cambio de color del texto al pasar el ratón
                                },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center', 
                            }}
                            onClick={
                                () => navigate('/productos')
                            }
                        >
                        <Inventory2Icon sx={{ fontSize: 20, mr: 1 }}/>
                        <Typography fontWeight='bold' variant='inherit'>
                        Productos
                        </Typography>
                    </Button>
                    <Button 
                        variant='contained' 
                            color='button'
                            fullWidth
                            sx={{
                                fontSize: {lg: 15, xs: 10 }, 
                                mb:3,
                                border: '1px solid #403C3D',
                                '&:hover': {
                                    border: '1px solid #0F4957',
                                    backgroundColor: '#0F4957',   // Cambio de color de fondo al pasar el ratón
                                    color: 'white',             // Cambio de color del texto al pasar el ratón
                                },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center', 
                            }}
                            onClick={
                                () => navigate('/reportes')
                            }
                    >
                        <BarChartIcon sx={{ fontSize: 20, mr: 1 }}/>
                        <Typography fontWeight='bold' variant='inherit'>
                        Reportes
                        </Typography>
                    </Button>
                    </Grid>
                    </Grid>
                    <Grid container justifyContent='center'>
                        <Grid item xs={6} md={4}>
                            <Button 
                                variant='contained' 
                                color='button'
                                fullWidth
                                sx={{
                                    fontSize: {lg: 10, xs: 8 }, 
                                    mb:-2,
                                    border: '1px solid #403C3D',
                                    '&:hover': {
                                        border: '1px solid #0F4957',
                                        backgroundColor: '#0F4957',   // Cambio de color de fondo al pasar el ratón
                                        color: 'white',             // Cambio de color del texto al pasar el ratón
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center', 
                                }}
                                onClick= {startLogout}                            >
                            <Typography fontWeight='bold' variant='inherit'>
                            Cerrar sesión
                            </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>    
        </Grid>

  )
}

