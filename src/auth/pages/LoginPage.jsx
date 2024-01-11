import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Link, MenuItem, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthStore, useForm } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout"
import Swal from "sweetalert2";
import 'animate.css';

const loginFormFields ={
  email: '',
  password: '',
}

const currencies = [
  {
    value: 'USD',
    label: 'Sucursal 1',
  },
  {
    value: 'EUR',
    label: 'Sucursal 2',
  },
  {
    value: 'BTC',
    label: 'Sucursal 3',
  },
];


export const LoginPage = () => {

  const { startLogin, errorMessage } = useAuthStore();

  const { 
     email, password, onInputChange:onLoginInputChange 
  } = useForm( loginFormFields );

  const loginSubmit = ( event ) => {
    event.preventDefault();
    startLogin({ email, password});
  } 

  const [showPassword, setShowPassword] = useState();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  useEffect(() => {
    if ( errorMessage !== undefined && errorMessage !== null ){
      
      Swal.fire({
        title: 'Error en la autenticación', 
        text: errorMessage,
        icon: 'error',
        iconColor: '#F91101',
        background: '#E8E6DB',
        confirmButtonColor: '#C5A366',
        showClass: {
          popup: 'animate__animated animate__zoomIn'
        },
        hideClass: {
          popup: 'animate__animated animate__zoomOut'
        }
      }).then((footer) => {
      });
    }

  }, [errorMessage])

  return (
    <AuthLayout title='Iniciar sesión' cancel='none'>
    <form onSubmit={ loginSubmit }>
          <Grid >

          <Grid item xs={12} sx={{ mt: 0 }}>
            <FormControl variant='standard' fullWidth>
              <InputLabel htmlFor='username'>
                <Typography fontWeight='bold' variant='inherit'>
                  Nombre de usuario
                </Typography>
              </InputLabel>
              <Input type='text' name='email' value={email} onChange={onLoginInputChange} />
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <FormControl variant="standard" fullWidth>
            
              <TextField
                select
                variant="standard"
                label="Sucursal"
                fontWeight='bold'
                fullWidth
                id="sucursal"
                InputLabelProps={{
                  style: { fontWeight: 'bold' },
                }}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
            
            <Grid item xs={ 12 } sx={{ mt: 1}}>
              <FormControl variant='standard' fullWidth>
                <InputLabel htmlFor="standard-adornment-password">
                  <Typography fontWeight='bold' variant='inherit'>
                    Contraseña
                  </Typography>
                </InputLabel>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={ password }
                    onChange={ onLoginInputChange }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
              </FormControl>
            </Grid>

         {/*    <div>        
        <EmojtCha onSelect={setIsValidationPassed} />
      </div> */}
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
                  Iniciar sesión
                </Typography>
                </Button>
            </Grid>
          </Grid>

        </form>
        

    </AuthLayout>
  )
}

