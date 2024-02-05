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
  sucursal: ''
}

const currencies = [
  {
    value: 'Suc1',
    label: 'Sucursal 1',
  },
  {
    value: 'Suc',
    label: 'Sucursal 2',
  },
  {
    value: 'Suc3',
    label: 'Sucursal 3',
  },
];


export const LoginPage = () => {

  const { startLogin, errorMessage } = useAuthStore();
  const [selectedSucursal, setSelectedSucursal] = useState('');

  const { 
     email, password, onInputChange:onLoginInputChange 
  } = useForm( loginFormFields );

  const loginSubmit = ( event ) => {
    event.preventDefault();
    startLogin({ email, password, sucursal: selectedSucursal });
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
        background: '#AAB7B8',
        confirmButtonColor: 'green',
        color: 'black',
        showClass: {
          popup: 'animate__animated animate__zoomIn'
        },
        hideClass: {
          popup: 'animate__animated animate__zoomOut'
        }
      });
    }

  }, [errorMessage])

  return (
    <AuthLayout title='Iniciar sesión' cancel='none'>
    <form onSubmit={ loginSubmit }>
          <Grid >

          <Grid item xs={12}>
            <FormControl variant='standard' fullWidth>
              <InputLabel htmlFor='username'>
                <Typography 
                  sx={{ fontWeight: 'bold', fontSize: {md: 16, xs: 14 }}}
                >
                  Nombre de usuario
                </Typography>
              </InputLabel>
              <Input type='text' name='email' value={email} onChange={onLoginInputChange}/>
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
          <FormControl variant="standard" fullWidth>
              <TextField
                select
                variant="standard"
                label="Sucursal"
                fullWidth
                id="sucursal"
                name="sucursal"
                value={selectedSucursal}
                onChange={(e) => setSelectedSucursal(e.target.value)}
                InputLabelProps={{
                  sx: { fontWeight: 'bold', fontSize: { md: 16, xs: 14 } },
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
                  <Typography 
                    sx={{ fontWeight: 'bold', fontSize: {md: 16, xs: 14 }}}
                    >
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
          <Grid container justifyContent="center" sx={{mb: -1, mt:5}}>
            <Grid item lg={7} md={8} sm={7} xs={8}>
                <Button 
                type='submit'
                variant="contained" 
                color="primary"
                fullWidth
                sx={{fontSize: {lg: 15, md:12, sm: 12, xs: 10 }}}
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

