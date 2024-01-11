import { AuthLayout } from "../layout/AuthLayout"
import { useEffect, useState } from "react";
import { Button, FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material"
import { useAuthStore, useForm } from "../../hooks";
import { Link as RouterLink, useLocation} from 'react-router-dom';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import PasswordChecklist from "react-password-checklist"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";

const title = 'Ingresa tus nuevas credenciales'

const securePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[:.,;_$@$!%°'"#*/{}+()=?&-])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

const changuePasswordField = {
    password: '',
    passwordVerify: ''
}

const formValidation ={
    password: [ (value) => value.match(securePassword) , 'cotraseña incorrecta'],
  }

export const ChangePassword = () => {

    const location = useLocation();

    const { startUpdatePassword, errorMessage } = useAuthStore();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [verifyPassswordValid, setVerifyPassswordValid] = useState(false)

    const { 
        password, passwordVerify, onInputChange:onPasswordInputChange, onInputChange:onPasswordInputChangeVerify, isFormValid, passwordValid 
      } = useForm( changuePasswordField, formValidation );
    
    useEffect(() => {
        verifyPasssword();
    
    }, [passwordVerify])

    const verifyPasssword = () => {

        password === passwordVerify ? setVerifyPassswordValid(false) : setVerifyPassswordValid(true)
    }

    const obtainUserId = (location) => {
        let id = location.pathname.split(':')
        return id[1];
    }


    const changueSubmit = async( event ) => {
        event.preventDefault();
        setFormSubmitted(true)
        if ( !isFormValid ) return;
        if( passwordVerify === '') return verifyPasssword();
        if ( verifyPassswordValid ) return;    
        const id = obtainUserId(location);
        startUpdatePassword({id, password})
    }

    useEffect(() => {
        if ( errorMessage !== undefined && errorMessage !== null ){
          Swal.fire({
            title: 'Error al actualizar las credenciales', 
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
          }).then((result) => {
            if ( result.isConfirmed || result.isDismissed){
                window.location.href = '/'
            }
          });
        }
    
      }, [errorMessage])

    const [showPassword, setShowPassword] = useState();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [showPasswordVerify, setShowPasswordVerify] = useState();
    const handleClickShowPasswordVerify = () => setShowPasswordVerify((show) => !show);
    const handleMouseDownPasswordVerify = (event) => {
        event.preventDefault();
    };

  return (
    <AuthLayout title={title} to='/auth/recovery' link='none'>
        <Grid container>
        <Grid item xs={ 12 } sx={{ mt: 2 }}>
        <FormControl 
            variant="standard" 
            fullWidth
            error ={ !!passwordValid && formSubmitted}
        >
            <InputLabel htmlFor="standard-adornment-password">
                <Typography fontWeight='bold' variant='inherit'>
                    Contraseña
                </Typography>
            </InputLabel>
            <Input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={ password }
                onChange={ onPasswordInputChange }
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
            <FormHelperText>
            {!!passwordValid && formSubmitted 
                ? <PasswordChecklist
                    rules={['minLength','maxLength','specialChar','number','capital', 'lowercase' ]}
                    minLength={8}
                    maxLength={15}
                    value={password}
                    messages={{
                    minLength: 'La contraseña tiene más de 8 caracteres.',
                    maxLength: 'La contraseña tiene menos de 15 caracteres.',
                    specialChar: 'La contraseña tiene caracteres especiales.',
                    number: 'La contraseña tiene un número.',
                    capital: 'La contraseña tiene una letra mayúscula.',
                    lowercase: 'La contraseña tiene una letra minúscula.'
                    }}
                /> 
            : ''}
            </FormHelperText>
        </FormControl>
        </Grid>

        <Grid item xs={ 12 } sx={{ mt: 2 }} hidden={!isFormValid}>
        <FormControl 
            variant="standard" 
            fullWidth
            error ={ verifyPassswordValid }
        >
            <InputLabel htmlFor="standard-adornment-password">
                <Typography fontWeight='bold' variant='inherit'>
                    Verifica contraseña
                </Typography>
            </InputLabel>
            <Input
                type={showPasswordVerify ? 'text' : 'password'}
                name='passwordVerify'
                value={ passwordVerify }
                onChange={ onPasswordInputChangeVerify }
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    onClick={handleClickShowPasswordVerify}
                    onMouseDown={handleMouseDownPasswordVerify}
                    >
                    {showPasswordVerify ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
            />
            <FormHelperText>
                { !verifyPassswordValid ? '' : 'Contraseña no coincide'}
            </FormHelperText>
        </FormControl>
        </Grid>
        <Grid container spacing={3} sx={{mb: 0, mt:1}}>
                <Grid item xs={ 12 }>
                    <Button 
                        type='submit'
                        variant="contained" 
                        fullWidth
                        sx={{fontSize: {lg: 15, xs: 10 }}}
                        >
                        <Typography fontWeight='bold' variant='inherit'>
                            Cambiar contraseña
                        </Typography>
                    </Button>
                </Grid>
            </Grid>

        </Grid>
    </AuthLayout>
    )
}
