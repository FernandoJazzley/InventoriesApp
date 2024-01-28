import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {FormControl, FormControlLabel, FormLabel, Grid, Input, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const FormAdd = ({ open, handleClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [sucursal, setSucursal] = useState('');

  const handleChange = (event) => {
    setSucursal(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          onClick: (event) => event.stopPropagation(), // Evita el cierre al clic en la capa de fondo
          style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
        }}
      >
        <Box sx={style}>
            <Typography variant="h5" align="center" gutterBottom>
              Agregar usuario
            </Typography>
          <form>
            <Grid>
            <Grid container item xs={12} justifyContent='center'>
              <label htmlFor="image-upload" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Button variant="contained" component="span">
                  Cargar Foto
                </Button>
                {selectedImage && (
                  <Avatar alt="Avatar" src={selectedImage} sx={{ width: 100, height: 100, marginTop: '8px' }} />
                )}
              </label>
              <Input
                type="file"
                accept="image/*"
                id="image-upload"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  label="Nombre completo"
                  type="text"
                  fullWidth
                  name="complete_name_user"
                />
              </Grid>
              <Grid container mt={2}>
                <Grid item xs={6}>
                  <TextField
                    variant='standard'
                    label='Edad'
                    type='number'
                    fullWidth
                    name='Edad'
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend" style={{ textAlign: 'center' }}>Sexo</FormLabel>
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      defaultValue="top"
                      style={{ justifyContent: 'center' }}
                    >
                      <FormControlLabel
                        value="Hombre"
                        control={<Radio />}
                        label="H"
                        labelPlacement="bottom"
                      />
                      <FormControlLabel
                        value="Mujer"
                        control={<Radio />}
                        label="M"
                        labelPlacement="bottom"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container > 
              <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label">Fecha de nacimiento</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker />
                </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid container mt={4} justifyContent={'space-between'}>
                <Grid item xs={5.8}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sucursal</InputLabel>
                  <Select
                  variant='standard'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sucursal}
                    label='Sucursal'
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Sucural 1</MenuItem>
                    <MenuItem value={20}>Sucursal 2</MenuItem>
                    <MenuItem value={30}>Suursal 3</MenuItem>
                  </Select>
                </FormControl>
                </Grid>
                <Grid item xs={5.8}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Horario laboral</InputLabel>
                  <Select
                  variant='standard'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sucursal}
                    label='Sucursal'
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Matutino</MenuItem>
                    <MenuItem value={20}>Vespertino</MenuItem>
                    <MenuItem value={30}>Nocturno</MenuItem>
                  </Select>
                </FormControl>
                </Grid>
              </Grid>
              <Grid container mt={4}>
                <Grid item xs={12}>
                  <TextField
                    variant='standard'
                    id="outlined-multiline-static"
                    label='Descripción'
                    multiline
                    fullWidth
                    rows={2}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent='space-between' direction="row" sx={{ mt: 3 }}>
                <Grid item xs={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleClose}
                    sx={{ fontSize: { lg: 15, xs: 10 } }}
                  >
                    Cerrar
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="button"
                    fullWidth
                    sx={{ fontSize: { lg: 15, xs: 10 } }}
                  >
                    REGISTRATE
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};