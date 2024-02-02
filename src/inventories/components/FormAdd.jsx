import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { FormControl, FormControlLabel, FormLabel, Grid, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import inventoriesApi from '../../api/inventoriesApi';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el idioma español para Day.js

dayjs.locale('es'); // Establece el idioma español en Day.js


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
  const [formData, setFormData] = useState({
    complete_name: '',
    age: '',
    sex: '',
    birthdate: null,
    branch: '',
    working_hours: '',
    description: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedWorkingHours, setSelectedWorkingHours] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      birthdate: date,
    });
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
    setFormData({
      ...formData,
      branch: event.target.value,
    });
  };

  const handleWorkingHoursChange = (event) => {
    setSelectedWorkingHours(event.target.value);
    setFormData({
      ...formData,
      working_hours: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('profileImage', selectedImage);
    formDataToSend.append('complete_name', formData.complete_name);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('sex', formData.sex);
    formDataToSend.append('birthdate', formData.birthdate ? formData.birthdate.toISOString() : null);
    formDataToSend.append('branch', formData.branch);
    formDataToSend.append('working_hours', formData.working_hours);
    formDataToSend.append('description', formData.description);

    try {

      const response = await inventoriesApi.post('/inventories/addUser/', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data', // Importante: indica que estás enviando un formulario con archivos
      },
    });
      console.log('Respuesta del servidor:', response.data);
      handleClose();
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
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
          onClick: (event) => event.stopPropagation(),
          style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
        }}
      >
        <Box sx={style}>
          <Typography variant="h5" align="center" gutterBottom>
            Agregar usuario
          </Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid>
              <Grid container item xs={12} justifyContent='center'>
                <label htmlFor="image-upload" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Button variant="contained" component="span">
                    Cargar Foto
                  </Button>
                  <Avatar alt="Avatar" src={selectedImage ? URL.createObjectURL(selectedImage) : ''} sx={{ width: 100, height: 100, marginTop: '8px' }} />
                  <Input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  label="Nombre completo"
                  type="text"
                  fullWidth
                  name="complete_name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid container mt={2}>
                <Grid item xs={6}>
                  <TextField
                    variant='standard'
                    label='Edad'
                    type='number'
                    fullWidth
                    name='age'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend" style={{ textAlign: 'center' }}>Sexo</FormLabel>
                    <RadioGroup
                      row
                      aria-label="position"
                      name="sex"
                      defaultValue="top"
                      style={{ justifyContent: 'center' }}
                      onChange={handleChange}
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
                    <DatePicker onChange={handleDateChange} />
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
                      value={selectedBranch}
                      label='Sucursal'
                      onChange={handleBranchChange}
                      name="branch"
                    >
                      <MenuItem value={'Sucursal 1'}>Sucursal 1</MenuItem>
                      <MenuItem value={'Sucursal 2'}>Sucursal 2</MenuItem>
                      <MenuItem value={'Sucursal 3'}>Sucursal 3</MenuItem>
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
                      value={selectedWorkingHours}
                      label='Horario laboral'
                      onChange={handleWorkingHoursChange}
                      name="working_hours"
                    >
                      <MenuItem value={'Matutino'}>Matutino</MenuItem>
                      <MenuItem value={'Vespertino'}>Vespertino</MenuItem>
                      <MenuItem value={'Nocturno'}>Nocturno</MenuItem>
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
                    name="description"
                    onChange={handleChange}
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