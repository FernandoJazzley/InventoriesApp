import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { FormControl, FormControlLabel, FormLabel, Grid, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import inventoriesApi from '../../api/inventoriesApi';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el idioma español para Day.js
import Swal from 'sweetalert2';

dayjs.locale('es'); // Establece el idioma español en Day.js


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgba(204, 209, 209, 0.8)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const formStyle = {
  maxHeight: '85vh', // Altura máxima del formulario (70% de la altura visible)
  overflowY: 'auto', // Habilita el desplazamiento vertical si el contenido supera la altura máxima
  scrollbarWidth: 'thin', // Para navegadores que no admiten ::-webkit-scrollbar
  '::-webkit-scrollbar': {
    width: '6px', // Ancho de la barra de desplazamiento
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0)', // Color de la barra de desplazamiento
    borderRadius: '6px', // Bordes redondeados
  },
};

export const FormAdd = ({ open, handleClose , selectedUser, onUpdateData, updateUsersList  }) => {

  const [formData, setFormData] = useState({
    complete_name: '',
    age: '',
    sex: 'Hombre',
    birthdate: null,
    branch: '',
    working_hours: '',
    description: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedWorkingHours, setSelectedWorkingHours] = useState('');

  const handleChange = (event) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        formData.profileImage = file;
      } catch (error) {
        console.error('Error al crear la URL de la imagen:', error);
        setSelectedImage(null);  // O cualquier otra lógica para la imagen predeterminada
      }
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

  useEffect(() => {
    if (selectedUser) {  
      setFormData({
        complete_name: selectedUser.complete_name || '',
        age: selectedUser.age || '',
        sex: selectedUser.sex || '',
        birthdate: selectedUser.birthdate ? dayjs(selectedUser.birthdate) : null,
        branch: selectedUser.branch || '',
        working_hours: selectedUser.working_hours || '',
        description: selectedUser.description || '',
      });
      if (selectedUser.profileImage) {
        try {
          // Intenta crear una URL con la imagen
          setSelectedImage(URL.createObjectURL(new Blob([selectedUser.profileImage])));
        } catch (error) {
          console.error('Error al crear la URL de la imagen:', error);
          // Si hay un error, establece la imagen predeterminada o maneja de otra manera
          setSelectedImage(null);  // O cualquier otra lógica para la imagen predeterminada
        }
      } else {
        // Si no hay imagen definida en selectedUser, usa la imagen predeterminada
        setSelectedImage(null);  // O cualquier otra lógica para la imagen predeterminada
      }
    } else{
      setFormData({
        complete_name:'',
        age:'',
        sex:'Hombre',
        birthdate: null,
        branch: '',
        working_hours: '',
        description:'',
      });
      setSelectedImage(null);
    }
  }, [selectedUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let formDataToSend = new FormData();
    formDataToSend.append('profileImage', formData.profileImage);
    formDataToSend.append('complete_name', formData.complete_name);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('sex', formData.sex);
    formDataToSend.append('birthdate', formData.birthdate ? formData.birthdate.toISOString() : null);
    formDataToSend.append('branch', formData.branch);
    formDataToSend.append('working_hours', formData.working_hours);
    formDataToSend.append('description', formData.description);

    const showAlert = async (title, text, icon) => {
      await new Promise(resolve => setTimeout(resolve, 300));  // Espera 300 milisegundos (ajusta según tu necesidad)
      Swal.fire({
        title: title,
        text: text,
        icon: icon,
        iconColor: "#D35400",
        confirmButtonColor: "green",
        color: 'black',
        background: '#AAB7B8',
        customClass: {
          container: 'custom-swal-container', // Clase personalizada para ajustar el z-index
        },
      });
    };

    if (selectedUser){
      try {
        const response = await inventoriesApi.put(`/inventories/editUser/${selectedUser.id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const title = ''
        const text= 'Usuario editado exitosamente.'
        const icon = 'succes'
        showAlert(title, text, icon); 
        handleClose();
        updateUsersList();
      } catch (error) {
        const title = '¡Error!'
        const text= 'No se ha podido editar el usuario, favor de verificar los datos.'
        const icon = 'error'
        showAlert(title, text, icon); 
        console.error('Error al enviar la solicitud:', error);
      }
    } else{
      try {
        const response = await inventoriesApi.post('/inventories/addUser/', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        //console.log('Respuesta del servidor:', response.data);
        handleClose();
        const title = ''
        const text= 'Usuario agregado exitosamente.'
        const icon = 'succes'
        showAlert(title, text, icon);
        updateUsersList(); 
      } catch (error) {
        const title = '¡Alerta!'
        const text= 'Por favor, debe llenar todos los datos del formulario'
        const icon = 'warning'
        showAlert(title, text, icon); 
        console.error('Error al enviar la solicitud:', error);
      }
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
          style: { backgroundColor: 'rgba(0, 0, 0, 0.85)' }
        }}
      >
        <Box sx={style}>
          <Typography variant="h5" color='primary' align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          {selectedUser ? 'Editar usuario' : 'Agregar usuario'}
          </Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid sx={formStyle}>
              <Grid container item xs={12} justifyContent='center'>
                <label htmlFor="image-upload" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Button variant="contained" component="span" color='button'
                    sx={{
                      fontSize: {lg: 15, xs: 10 }, 
                      mr:5,
                      border: '1px solid #403C3D',
                      '&:hover': {
                          border: '1px solid #0F4957',
                          backgroundColor: '#0F4957',   // Cambio de color de fondo al pasar el ratón
                          color: 'white',             // Cambio de color del texto al pasar el ratón
                        },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}  
                  >
                    {selectedUser ? 'Cambiar foto' : 'Cargar foto'}
                  </Button>
                  <Avatar
                    alt="Avatar"
                    src={selectedImage ? selectedImage : ''}
                    sx={{ background:'#2C3E50',width: 100, height: 100, marginTop: '8px' }}
                  />                  <Input
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
                  variant='standard'
                  label="Nombre completo"
                  type="text"
                  fullWidth
                  value={formData.complete_name || ''}
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
                    value={formData.age || ''}
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
                      defaultValue={formData.sex || 'Hombre'}
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
                    <DatePicker value={formData.birthdate || ''} onChange={handleDateChange} />
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
                      value={formData.branch || selectedBranch}
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
                      value={formData.working_hours || selectedWorkingHours}
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
                    value={formData.description || ''}
                    name="description"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent='space-between' direction="row" sx={{ mt: 3 }}>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    fullWidth
                    color='error'
                    onClick={handleClose}
                    sx={{
                      fontSize: {lg: 15, xs: 10 }, 
                      border: '1px solid #17202A',
                      '&:hover': {
                        border: '1px solid #FDFEFE',
                        backgroundColor: 'error',   // Cambio de color de fondo al pasar el ratón
                        color: 'white',             // Cambio de color del texto al pasar el ratón
                        },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }} 
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
                    sx={{
                      fontSize: {lg: 15, xs: 10 }, 
                      border: '1px solid #403C3D',
                      '&:hover': {
                          border: '1px solid #0F4957',
                          backgroundColor: '#0F4957',   // Cambio de color de fondo al pasar el ratón
                          color: 'white',             // Cambio de color del texto al pasar el ratón
                        },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }} 
                  >
                    {selectedUser ? 'Editar' : 'Agregar'}
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