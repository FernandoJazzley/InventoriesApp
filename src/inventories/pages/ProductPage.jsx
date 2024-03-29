import { Grid } from "@mui/material";
import { InventoriesLayout } from "../layout/InventoriesLayout"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Scrollbars from 'react-custom-scrollbars';
import { Store } from "@mui/icons-material";


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
];

export const ProductPage = () => {
  return (
    <InventoriesLayout title='Productos' display='none' icon={<Store />}>
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
                <ImageList
                  sx={{
                    width: '100%', // Abarcar el ancho del contenedor
                    maxWidth: '1200px', // Limitar el ancho máximo si es necesario
                    overflowX: 'auto', // Permitir desplazamiento horizontal en dispositivos pequeños
                  }}
                  gap={8} // Ajustar el espacio entre las imágenes
                  cols={3} // Número deseado de imágenes por fila (puedes ajustar según tus necesidades)
                >
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Ajustar el tamaño de la imagen
                      />
                      <ImageListItemBar
                        title={item.title}
                        subtitle={<span>by: {item.author}</span>}
                        position="below"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
            </Scrollbars>
          </Grid>
        </Grid>
      </Grid>
    </InventoriesLayout>
  );
};