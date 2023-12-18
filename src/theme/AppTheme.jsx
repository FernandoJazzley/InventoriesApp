import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { inventoriesTheme } from "./"

export const AppTheme = ({ children }) => {
    return (
      <ThemeProvider theme={ inventoriesTheme }>
  
          <CssBaseline/>
          { children }
  
      </ThemeProvider>
    )
  };