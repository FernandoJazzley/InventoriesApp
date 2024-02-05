import { InventoriesLayout } from "../layout/InventoriesLayout"
import { ShoppingCart } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {
  DataGridPro,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  useGridApiContext,
  useGridRootProps,
} from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';
import { useCallback, useState } from "react";
import { Grid } from "@mui/material";

function GridCustomToolbar({ syncState }) {
  const rootProps = useGridRootProps();
  const apiRef = useGridApiContext();

  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Button
        size="small"
        startIcon={<rootProps.slots.columnSelectorIcon />}
        onClick={() => syncState(apiRef.current.exportState())}
        {...rootProps.slotProps?.baseButton}
      >
        Recreate the 2nd grid
      </Button>
    </GridToolbarContainer>
  );
}

export const OrdersPage = () => {
  const { data, loading } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });

  const [savedState, setSavedState] = useState({
    count: 0,
    initialState: data.initialState,
  });

  const syncState = useCallback((newInitialState) => {
    setSavedState((prev) => ({
      ...prev,
      count: prev.count + 1,
      initialState: newInitialState,
    }));
  }, []);

  return (
    <InventoriesLayout title='Pedidos' display='none' icon={<ShoppingCart/> }>
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
            <Box sx={{ height: 336 }}>
        <DataGridPro
          {...data}
          loading={loading}
          slots={{ toolbar: GridCustomToolbar }}
          slotProps={{ toolbar: { syncState } }}
        />
      </Box>
      <Box sx={{ height: 300 }}>
        <DataGridPro
          {...data}
          loading={loading}
          initialState={savedState.initialState}
          key={savedState.count}
        />
      </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </InventoriesLayout>
  )
}

