import { Grid, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Zoom } from "react-reveal"
import VerificationInput from "react-verification-input";

const title = 'Se ha enviado un código de verificación al correo de la cuenta registrada'

export const VerifyPage = () => {
  return (
    <AuthLayout title={title} to='/auth/recovery' link='none'>
    <Typography
          textAlign="center"
          component='span'
          padding={1}
          sx={{ fontWeight: 'medium', fontSize: { lg: 20, md: 15, xs: 10}}}
        >
        <Zoom cascade>
          Ingrese el código
        </Zoom>
      </Typography>

      <Grid container direction='row' sx={{ mb: 1, mt: 1 }} >
        <Grid item xs={ 12 } display="flex" justifyContent="center">
          <Zoom>
            <VerificationInput
            classNames={{
              character: "character",
              characterSelected: "character--selected",
            }}
              validChars="0-9" 
              length={4}
              autoFocus={true}
              passwordMode={true}
              inputProps={{ inputMode: "numeric" }}
              onComplete={
                (codigo) =>  codigoSubmit(codigo)
              }
              
            />
          </Zoom>
        </Grid>
      </Grid>

    </AuthLayout>
  )
}

