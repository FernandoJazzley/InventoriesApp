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
            <Grid item xs={12} sx={{ mt: 0 }}>
                <FormControl variant='standard' fullWidth>
                    <InputLabel htmlFor='username'>
                    <Typography fontWeight='bold' variant='inherit'>
                        Introduce tu nombre de usuario para recuperar tu cuenta
                    </Typography>
                    </InputLabel>
                    <Input type='text' name='email' value={email} onChange={onRecoveryInputChange} />
                </FormControl>
            </Grid>
            <Grid container justifyContent="center" spacing={1} sx={{mb: -2, mt:3}}>
            <Grid item xs={ 7 }>
                <Button
                variant="contained" 
                color="primary"
                fullWidth
                sx={{fontSize: {lg: 15, xs: 10 }}}
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

