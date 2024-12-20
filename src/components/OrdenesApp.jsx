import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Grid,
  Stack,
  Link
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  Map as MapIcon
} from '@mui/icons-material';

// Datos de localidades de San Isidro
const LOCALIDADES = {
  principales: [
    "Acassuso", "Beccar", "Boulogne", "Martínez", "San Isidro Centro", "Villa Adelina"
  ],
  barrios: [
    "La Horqueta", "Las Lomas", "Bajo de San Isidro", "Villa Jardín", "Santa Rita"
  ],
  asentamientos: [
    "Bajo Boulogne", "La Cava", "Uruguay", "San Cayetano", "El Congo"
  ]
};

const TECNICOS = [
  { id: '1', nombre: 'Juan Pérez', telefono: '549116789', zona: 'Norte' },
  { id: '2', nombre: 'María García', telefono: '549118765', zona: 'Sur' },
  { id: '3', nombre: 'Carlos López', telefono: '549114532', zona: 'Oeste' }
];
const OrdenesApp = () => {
    // Cargar datos del localStorage al iniciar
    const [clientes, setClientes] = useState(() => {
      const savedClientes = localStorage.getItem('clientes');
      return savedClientes ? JSON.parse(savedClientes) : [];
    });
  
    const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState('');
    const [nuevoCliente, setNuevoCliente] = useState({
      nombre: '',
      telefono: '',
      direccion: '',
      entreCalles: '',
      localidad: '',
      horario: '',
      problema: ''
    });
  
    // Guardar en localStorage cuando cambian los clientes
    useEffect(() => {
      localStorage.setItem('clientes', JSON.stringify(clientes));
    }, [clientes]);
  
    const agregarCliente = () => {
      if (nuevoCliente.nombre && nuevoCliente.direccion && nuevoCliente.localidad) {
        setClientes([...clientes, { ...nuevoCliente, id: Date.now() }]);
        setNuevoCliente({
          nombre: '',
          telefono: '',
          direccion: '',
          entreCalles: '',
          localidad: '',
          horario: '',
          problema: ''
        });
      }
    };
  
    const eliminarCliente = (id) => {
      setClientes(clientes.filter(cliente => cliente.id !== id));
    };
  
    const enviarPorWhatsApp = () => {
      const tecnico = TECNICOS.find(t => t.id === tecnicoSeleccionado);
      if (!tecnico || clientes.length === 0) return;
  
      let mensaje = "🔧 *Rutina de trabajo - Control de Vectores*\n\n";
      clientes.forEach((cliente, index) => {
        mensaje += `*Cliente ${index + 1}:*\n`;
        mensaje += `📝 Nombre: ${cliente.nombre}\n`;
        mensaje += `📞 Teléfono: ${cliente.telefono}\n`;
        mensaje += `📍 Dirección: ${cliente.direccion}\n`;
        mensaje += `🏘️ Entre calles: ${cliente.entreCalles}\n`;
        mensaje += `🌎 Localidad: ${cliente.localidad}\n`;
        mensaje += `🕒 Horario: ${cliente.horario}\n`;
        mensaje += `⚠️ Problema: ${cliente.problema}\n\n`;
      });
  
      const mensajeCodificado = encodeURIComponent(mensaje);
      window.open(`https://api.whatsapp.com/send?phone=${tecnico.telefono}&text=${mensajeCodificado}`, '_blank');
    };
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Logo y Título */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <img 
              src="/api/placeholder/200/80" 
              alt="Logo San Isidro" 
              style={{ height: '80px', marginBottom: '1rem' }}
            />
            <Typography variant="h4" component="h1" gutterBottom color="primary">
              Gestión de Ordenes de Trabajo - Control de Vectores
            </Typography>
          </Box>
    
          {/* Formulario de nuevo cliente */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Nuevo Cliente
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre del Cliente"
                  value={nuevoCliente.nombre}
                  onChange={(e) => setNuevoCliente({...nuevoCliente, nombre: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={nuevoCliente.telefono}
                  onChange={(e) => setNuevoCliente({...nuevoCliente, telefono: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Localidad</InputLabel>
              <Select
                value={nuevoCliente.localidad}
                label="Localidad"
                onChange={(e) => setNuevoCliente({...nuevoCliente, localidad: e.target.value})}
              >
                <MenuItem value=""><em>Seleccione una localidad</em></MenuItem>
                <MenuItem disabled sx={{ bgcolor: 'action.hover' }}>
                  -- Localidades Principales --
                </MenuItem>
                {LOCALIDADES.principales.map(loc => (
                  <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                ))}
                <MenuItem disabled sx={{ bgcolor: 'action.hover' }}>
                  -- Barrios --
                </MenuItem>
                {LOCALIDADES.barrios.map(bar => (
                  <MenuItem key={bar} value={bar}>{bar}</MenuItem>
                ))}
                <MenuItem disabled sx={{ bgcolor: 'action.hover' }}>
                  -- Asentamientos --
                </MenuItem>
                {LOCALIDADES.asentamientos.map(asen => (
                  <MenuItem key={asen} value={asen}>{asen}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dirección"
              value={nuevoCliente.direccion}
              onChange={(e) => setNuevoCliente({...nuevoCliente, direccion: e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Entre Calles"
              value={nuevoCliente.entreCalles}
              onChange={(e) => setNuevoCliente({...nuevoCliente, entreCalles: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Horario"
              value={nuevoCliente.horario}
              onChange={(e) => setNuevoCliente({...nuevoCliente, horario: e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Problema"
              value={nuevoCliente.problema}
              onChange={(e) => setNuevoCliente({...nuevoCliente, problema: e.target.value})}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={agregarCliente}
            fullWidth
          >
            Agregar Cliente
          </Button>
        </Box>
      </Paper>
      {/* Lista de clientes */}
      {clientes.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Listado de Clientes ({clientes.length})
          </Typography>
          <Stack spacing={2}>
            {clientes.map(cliente => (
              <Card key={cliente.id} variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="h6">{cliente.nombre}</Typography>
                      <Typography>📞 {cliente.telefono}</Typography>
                      <Typography>🌎 {cliente.localidad}</Typography>
                      <Typography>📍 {cliente.direccion}</Typography>
                      <Typography>🏘️ Entre: {cliente.entreCalles}</Typography>
                      <Typography>🕒 {cliente.horario}</Typography>
                      <Typography>⚠️ {cliente.problema}</Typography>
                      <Link
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                          `${cliente.direccion}, ${cliente.localidad}, San Isidro, Buenos Aires, Argentina`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          display: 'inline-flex', 
                          alignItems: 'center',
                          mt: 1,
                          textDecoration: 'none'
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<MapIcon />}
                          color="info"
                        >
                          Cómo llegar
                        </Button>
                      </Link>
                    </Box>
                    <IconButton 
                      color="error"
                      onClick={() => eliminarCliente(cliente.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Paper>
      )}

      {/* Selección de técnico y envío */}
      {clientes.length > 0 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Seleccionar Técnico y Enviar
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Técnico</InputLabel>
            <Select
              value={tecnicoSeleccionado}
              label="Técnico"
              onChange={(e) => setTecnicoSeleccionado(e.target.value)}
            >
              <MenuItem value=""><em>Seleccione un técnico</em></MenuItem>
              {TECNICOS.map(tecnico => (
                <MenuItem key={tecnico.id} value={tecnico.id}>
                  {tecnico.nombre} - {tecnico.zona}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {tecnicoSeleccionado && (
            <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Técnico seleccionado:
              </Typography>
              <Typography>
                {TECNICOS.find(t => t.id === tecnicoSeleccionado)?.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                📞 {TECNICOS.find(t => t.id === tecnicoSeleccionado)?.telefono}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Zona: {TECNICOS.find(t => t.id === tecnicoSeleccionado)?.zona}
              </Typography>
            </Box>
          )}

          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={enviarPorWhatsApp}
            disabled={!tecnicoSeleccionado}
            fullWidth
          >
            Enviar por WhatsApp
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default OrdenesApp;