import { Grid, Typography } from "@mui/material"

export const LoginPage = () => {
  return (
    <Grid
      container
      spacing={0}
      justify= 'center'
      alignItems='center'
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 5}}
    >
     
          <Grid item
            ClassName='box-shadow'
            xs= {12} sm= {6}
            textAlign='center'
            justify= 'center'
            alignItems='center'
            sx={{ backgroundColor: 'blue', borderRadius: 2}}
          >
            <Typography>Image</Typography>
          </Grid>

          <Grid item
            ClassName='box-shadow'
            xs= {12} sm= {6}
            textAlign='center'
            justify= 'center'
            alignItems='center'
            sx={{ backgroundColor: 'white', borderRadius: 2}}
          >
            <Typography>Login</Typography>
          </Grid>
          
      </Grid>
  )
}

