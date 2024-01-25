import { useEffect } from "react";
import { useAuthStore, useForm } from "../../hooks";
import { Link as RouterLink} from 'react-router-dom';
import { Button, FormControl, Grid, Input, InputLabel, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import Swal from "sweetalert2";

const recoveryFormField = {
    email: ''
}

export const RecoveryPage = () => {

    const { startRecovery, errorMessage } = useAuthStore();

    const { 
        formState, email, onInputChange:onRecoveryInputChange
      } = useForm( recoveryFormField );

    const recoverySubmit = ( event ) => {
        event.preventDefault();
        startRecovery({email})
      }
      
      useEffect(() => {
        if ( errorMessage !== undefined && errorMessage !== null ){
          Swal.fire({
            title: 'Error en la busqueda', 
            text: errorMessage,
            icon: 'warning',
            iconColor: '#F07605',
            background: '#E8E6DB',
            confirmButtonColor: '#C5A366',
            showClass: {
              popup: 'animate__animated animate__zoomIn'
            },
            hideClass: {
              popup: 'animate__animated animate__zoomOut'
            }});
        }
      }, [errorMessage])

      return (
    <AuthLayout title='Recuperar cuenta' to='/auth/login' link='none'>
        <form  onSubmit={recoverySubmit}>
        <Grid>
            <Grid item xs={12}>
                <Typography textAlign='center' sx={{fontWeight: 'bold', fontSize: { lg: 16, md:14, sm:13, xs: 12}}}>
                  Introduce tu correo electrónico para buscar tu cuenta.
                </Typography>
                <FormControl variant='standard' fullWidth>
                    <InputLabel htmlFor='username'>
                    <Typography
                      sx={{ fontWeight: 'bold', fontSize: {md: 15, xs: 12}}}
                      >
                        Correo electrónico.
                    </Typography>
                    </InputLabel>
                    <Input type='text' name='email' value={email} onChange={onRecoveryInputChange} />
                </FormControl>
            </Grid>
            <Grid container justifyContent="center" spacing={1} sx={{mb: -2, mt:3}}>
            <Grid item lg={7} md={8} sm={7} xs={9}>
                <Button
                variant="contained" 
                color="primary"
                fullWidth
                sx={{fontSize: {lg: 15, md:12, sm: 12, xs: 10 }}}
                >
                <Typography fontWeight='bold' variant='inherit'>
                  Buscar cuenta
                </Typography>
                </Button>
            </Grid>
            </Grid>
        </Grid>
        </form>
    </AuthLayout>
  )
}

