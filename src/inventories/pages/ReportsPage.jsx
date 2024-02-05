import { InventoriesLayout } from "../layout/InventoriesLayout";
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Scrollbars from 'react-custom-scrollbars';
import { BarChart } from '@mui/x-charts/BarChart';
import { Grid } from "@mui/material";
import { ListAlt } from "@mui/icons-material";


const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

const data = [
  { value: 5, label: 'A' },
  { value: 10, label: 'B' },
  { value: 15, label: 'C' },
  { value: 20, label: 'D' },
];

const size = {
  width: 400,
  height: 200,
};


const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export const ReportsPage = () => {
  return (
    <InventoriesLayout title='Reportes' display='none' icon={<ListAlt/>}>
       <Grid container>
        <Grid container spacing={2} sx={{ padding: '10px', alignItems: 'center' }}>
          <Grid item xs={12} sm={12}>
            <Scrollbars style={{ height: '76vh',overflowX: 'auto' }}>
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
            <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
              <PieCenterLabel>Center label</PieCenterLabel>
            </PieChart>
            <BarChart
              width={500}
              height={300}
              series={[
                { data: pData, label: 'pv', id: 'pvId' },
                { data: uData, label: 'uv', id: 'uvId' },
              ]}
              xAxis={[{ data: xLabels, scaleType: 'band' }]}
            />
            </Grid>
           </Scrollbars>
          </Grid>
        </Grid>
      </Grid>
    </InventoriesLayout>
  );
};