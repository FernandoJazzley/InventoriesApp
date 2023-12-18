import { Grid , IconButton, Typography } from "@mui/material"
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import icono from '../../assets/iconoDemo.jpg'

export const AuthLayout = () => {

    return (
        <Grid
        container
        spacing={0}
        justify= 'center'
        alignItems='center'
        sx={{ minHeight: '100vh', backgroundColor: 'background.main', padding: 10}}
        >

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} md={6}
                    marginBottom={5}
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
                >{'title'}
                </Typography>
            </Grid>

            <Grid item xs={12} md={6} className='background-image' sx={{ borderRadius: 8}}>
            <div style={{position: 'relative', zIndex: 1 }}>

             <Grid container
                direction="column"
                justifyContent="center"
                alignContent="center"
            >
                <Grid item>
                <img src={icono} width= "70" height="70" className="logo"/>
                </Grid>
            </Grid>           

            <Grid item
                sx={{
                    marginRight: 2,
                    marginBottom: 1,
                    padding: 4, 
                    border: 'solid', 
                    borderWidth: 3, 
                    borderColor: 'primary.main', 
                    borderRadius: 4
                }}
            >
        <Grid marginTop={-3}  marginLeft={-1}>
          <IconButton
            color='error'
            edge='start'
            size='large'
            >
            <KeyboardReturnIcon >

            </KeyboardReturnIcon>
            </IconButton>
        </Grid> 
           {/*  <Typography 
            textAlign="center"
            sx={{ fontWeight: 'bold', mb: 2, fontSize: { lg: 20, md: 15, xs: 13}}}
            >¡Soy Sistemas Casa y soy profesional!
            </Typography>
            {'children'} */}
            
        </Grid>
        </div>
        </Grid> 
        </Grid>
    </Grid>
  )
}


