import { createTheme } from "@mui/material";

export const inventoriesTheme = createTheme({

    typography: {
        fontFamily: [
          'Poppins',
        ].join(','),
      },
      
    palette: {
        background:{
            /* main:'#CACACA' */

            /* main:'#E6E6E6' */
            /* main:'#E8E6DB' */
            main:'#DCDCDC'
        },
        primary: {
            main: '#0F4957'
        },
        secondary: {
            main: '#403C3D'
        },
        error: {
            main:'#590F15'
        },
        button:{
            main:'#CACACA'
        },
        link:{
            main: '#B48800'
        },

    }
})