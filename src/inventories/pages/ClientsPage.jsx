import { InventoriesLayout } from "../layout/InventoriesLayout";
import Box from '@mui/material/Box';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';
import { People } from "@mui/icons-material";
import { Grid } from "@mui/material";

export const ClientsPage = () => {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    editable: true,
  });

  return (
    <InventoriesLayout title='Clientes' display='none' icon={<People /> }>
      <Grid container spacing={3} sx={{ overflowX: 'hidden', padding: '10px', alignItems: 'center', width: '100%', margin: 0 }}>
        <Grid item xs={12} sm={12}>
          <Grid
            container
            direction="column"
            display='grid' // Cambié el valor de 'flex' a 'grid'
            gridTemplateRows="auto 1fr" // Una fila para el encabezado, una para el contenido
            alignContent='center'
            alignItems='center'
            justify='center'
            sx={{
              minHeight: '70vh', // Ajusta la altura mínima según tus necesidades
              padding: '20px',
              overflowX: 'auto', // Agregado para permitir el desplazamiento horizontal
              '@media (max-width: 600px)': {
                padding: '10px',
              },
            }}
          >
            <Box sx={{ overflowX: 'auto', width: '100%' }}>
              <DataGridPro
                {...data}
                loading={data.rows.length === 0}
                rowHeight={38}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </InventoriesLayout>
  );
};