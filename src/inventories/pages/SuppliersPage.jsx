import { InventoriesLayout } from "../layout/InventoriesLayout"
import { Business } from "@mui/icons-material";
import { Grid } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Scrollbars from 'react-custom-scrollbars';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#AAAAAA',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  maxWidth: 350,
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.`;


export const SuppliersPage = () => {
  return (
    <InventoriesLayout title='Proveedores' display='none' icon={<Business/>}>
      <Grid container>
        <Grid container spacing={3} sx={{ padding: '10px', alignItems: 'center' }}>
          <Grid item xs={12} sm={12}>
            <Scrollbars style={{ height: '76vh' }}>
              <Grid
                container
                direction="column"
                display='flex'
                justify='center'
                alignContent='center'
                alignItems='center'
                sx={{
                  backgroundColor: 'rgba(64, 64, 64, 0.2)',
                  padding: '20px',
                  '@media (max-width: 600px)': {
                    padding: '10px',
                  },
                }}
              >
      <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            <Item
              sx={{
                my: 1,
                mx: 'auto',
                p: 2,
              }}
            >
              <Stack spacing={2} direction="row" alignItems="center">
                <Avatar>W</Avatar>
                <Typography noWrap>{message}</Typography>
              </Stack>
            </Item>
            <Item
              sx={{
                my: 1,
                mx: 'auto',
                p: 2,
              }}
            >
              <Stack spacing={2} direction="row" alignItems="center">
                <Avatar>W</Avatar>
                <Typography noWrap>{message}</Typography>
              </Stack>
            </Item>
            <Item
              sx={{
                my: 1,
                mx: 'auto',
                p: 2,
              }}
            >
              <Stack spacing={2} direction="row" alignItems="center">
                <Avatar>W</Avatar>
                <Typography noWrap>{message}</Typography>
              </Stack>
            </Item>
            <Item
              sx={{
                my: 1,
                mx: 'auto',
                p: 2,
              }}
            >
              <Stack spacing={2} direction="row" alignItems="center">
                <Avatar>W</Avatar>
                <Typography noWrap>{message}</Typography>
              </Stack>
            </Item>
            <Item
              sx={{
                my: 1,
                mx: 'auto',
                p: 2,
              }}
            >
              <Stack spacing={2} direction="row" alignItems="center">
                <Avatar>W</Avatar>
                <Typography noWrap>{message}</Typography>
              </Stack>
            </Item>
            <Item
              sx={{
                my: 1,
                mx: 'auto',
                p: 2,
              }}
            >
              <Stack spacing={2} direction="row" alignItems="center">
                <Avatar>W</Avatar>
                <Typography noWrap>{message}</Typography>
              </Stack>
            </Item>
            <Item
              sx={{
                my: 1,
                mx: 'auto',
                p: 2,
              }}
            >
              <Stack spacing={2} direction="row" alignItems="center">
                <Stack>
                  <Avatar>W</Avatar>
                </Stack>
                <Stack sx={{ minWidth: 0 }}>
                  <Typography noWrap>{message}</Typography>
                </Stack>
              </Stack>
            </Item>
          </Box>
          </Grid>
            </Scrollbars>
          </Grid>
        </Grid>
      </Grid>
    </InventoriesLayout>
  )
}

