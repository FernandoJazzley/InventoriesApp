import { Button, Grid, IconButton, Link, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import icono from '../../assets/iconoDemo.jpg';

export const AuthLayout = ({ children, title = '', cancel, to='', link }) => {
  return (
    <Grid
      container
      display='flex'
      justifyContent='center'
      alignContent='center'
      alignItems='center'
      sx={{ minHeight: '100vh', backgroundColor: 'background.main' }}
    >

      <Grid container display='contents' maxWidth="md">
        <Grid item lg={6} md={6} sm={6} xs={12} textAlign='center' justify='center' alignItems='center'>
          <Typography
            sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: { lg: 70, md: 60, sm:55, xs: 50 } }}
          >
            Bienvenido
          </Typography>
          <Typography
            sx={{fontWeight: 'bold', fontSize: { lg: 18, md:17, sm:16, xs: 15 } }}
          >
            {title}
          </Typography>
        </Grid>

        <Grid item lg={5.5} md={6} sm={8} xs={12} className='background-image-log' sx={{ borderRadius: 4, margin: 3}}>
          <div style={{ position: 'relative', backgroundSize: 'cover', zIndex: 0 }}>
            <Grid container justifyContent="center">
              <Grid item>
                <img src={icono} width="70" height="70" className="logo" />
              </Grid>
            </Grid>

            <Grid
              sx={{
                margin: 5,
                padding: 5,
                border: 'solid',
                borderWidth: 3,
                borderColor: 'primary.main',
                borderRadius: 4
              }}
            >
              <Grid container display={cancel} justifyContent="flex-end" marginTop={-5} marginLeft={5}>
                <IconButton color='black' edge='start' size='large' component={RouterLink} to={to}>
                  <CancelIcon />
                </IconButton>
              </Grid>
              {children}
            </Grid>
          </div>
          <Grid container display={link} position='absolute' justifyContent="center" direction='row' sx={{ mb: 3, mt: 3 }}>
            <Grid container direction='row' justifyContent="center" sx={{ mt: 0 }}>
              <Link component={RouterLink} color='primary' to='/auth/recovery' sx={{ fontSize: { lg: 14, xs: 13 } }}>
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};