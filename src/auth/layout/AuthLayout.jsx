import { Button, Grid , IconButton, Link, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import icono from '../../assets/iconoDemo.jpg'

export const AuthLayout = ({ children , title = '', cancel, to='', link}) => {

    return (
        <Grid
        container
        display='flex'
        spacing={0}
        justify= 'center'
        alignContent='center'
        alignItems='center'
        sx={{ minHeight: '100vh', backgroundColor: 'background.main', padding: 10}}
        >

        <Grid container display='contents' rowSpacing={0} columnSpacing={{ xs: 3, sm: 2, md: 0 }}>
            <Grid item xs={12} md={6}
                    textAlign='center'
                    justify= 'center'
                    alignItems='center'
            >
                <Typography
                textAlign="center"
                sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' , fontSize: { lg: 70, md: 60, sm: 50, xs: 40}}}
                >Bienvenido
                </Typography>
                <Typography
                textAlign="center"
                sx={{ mb: 1 , fontSize: {lg: 20, sm: 15, xs: 12}}}
                >{title}
                </Typography>
            </Grid>

            <Grid item xs={12} md={6} className='background-image-log' sx={{borderRadius: 4 }}>
                <div style={{ position: 'relative', backgroundSize: 'cover', zIndex: 0 }} >
                    <Grid container justifyContent="center">
                            <Grid item>
                            <img src={icono}  width= "70" height="70" className="logo"/>
                            </Grid>
                    </Grid>        

                    <Grid 
                        sx={{
                            zIndex: 1,
                            margin: 5,
                            padding: 7,
                            border: 'solid', 
                            borderWidth: 3, 
                            borderColor: 'primary.main', 
                            borderRadius: 4
                        }}
                    >
                        <Grid container display={cancel} justifyContent="flex-end" marginTop={-7} marginLeft={7}>
                            <IconButton color='black' edge='start' size='large'
                                        LinkComponent={ RouterLink }
                                        to={to}
                            >
                                <CancelIcon />
                            </IconButton>
                        </Grid> 
                    {children}
                    </Grid>
                </div>    
                <Grid container display={link} position='absolute' justifyContent="center" direction='row' sx={{ mb:3, mt:3 }}>  
                    <Grid container direction='row' justifyContent="center" sx={{ mt:2 }}>
                        <Link component={ RouterLink } color='primary' to='/auth/recovery' sx={{fontSize: { lg: 14, xs: 13}}}>
                                ¿Olvidaste tu contraseña?
                        </Link>
                    </Grid>            
                </Grid>    
            </Grid>     
        </Grid>
        </Grid>
  )
}


