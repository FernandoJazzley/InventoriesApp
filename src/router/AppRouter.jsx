import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { InventoriesRoutes } from "../inventories/routes/InventoriesRoutes"
import { useAuthStore } from '../hooks'
import { useSelector } from "react-redux"
import { Grid, LinearProgress, Stack, Typography } from '@mui/material'
import InventoryIcon from '@mui/icons-material/Inventory';
import icono from '../assets/iconoDemo.jpg'

export const AppRouter = () => {

  const { user } = useSelector(state => state.auth)
  const { status, checkAuthToken } = useAuthStore();

  if (status === 'checking') {
    return (
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', backgroundColor: 'background.main', padding: 4}}
      >
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress />
        </Stack>
      </Grid>
      )
  }

  if (status === 'welcome'){
    const name = user.name;
    return(
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', backgroundColor: 'background.main', padding: 4}}
      >
        <Grid container
            textAlign={'center'}   
            alignItems={'center'}
            justifyContent={'center'} 
        >
        <Typography variant='h4' sx={{ fontWeight: 'bold'}}>
          BIENVENIDO: {name.toUpperCase()}
        </Typography>

        </Grid>
        <Grid container justifyContent="center" mb={2}>
          <Grid item>
            <img src={icono} width="100" height="100" className="logo" />
          </Grid>
        </Grid>
        <Grid container
            textAlign={'center'}   
            alignItems={'center'}
            justifyContent={'center'} 
            mt={2}
        > 
        <InventoryIcon 
        className='parpadea' 
        sx={{ fontSize: {xs:60, lg:80}, color:'secondary.main' }}
        />
        <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'primary.main'}}>
             InventoriesAPP
        </Typography>
        </Grid>
      </Grid>
    )
  }

  return (

    <Routes>

    {
      (status === 'not-authenticated' || status === 'recovery')
        ? (
          <>
            <Route path='/auth/*' element={<AuthRoutes />} />
            <Route path='/*' element={<Navigate to='/auth/login' />} />
          </>

        )
        : (
          <>
            <Route path='/*' element={<InventoriesRoutes />} />
            <Route path='/*' element={<Navigate to='/' />} />
          </>
      )
    }

    </Routes>

  )
}
