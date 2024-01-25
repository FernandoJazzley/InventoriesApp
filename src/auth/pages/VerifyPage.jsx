import { Grid, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Zoom } from "react-reveal"
import VerificationInput from "react-verification-input";

const title = 'Ingrese el código.'

export const VerifyPage = () => {
  return (
    <AuthLayout title={title} to='/auth/recovery' link='none'>
        <Typography textAlign='center' mb={2} sx={{fontSize: { lg: 16, md:14, sm:13, xs: 12}}}>
        <Zoom cascade>
        Se ha enviado un código de verificación al correo de la cuenta registrada
        </Zoom>
      </Typography>

      <Grid container direction='row'>
        <Grid item xs={ 12 } mt={2} display="flex" justifyContent="center">
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

