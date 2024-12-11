const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const clienteRoutes = require('./routes/cliente'); // Importa las rutas de Cliente

const app = express();
const port = 3000; // Puerto fijo, ya no depende de variables de entorno

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', clienteRoutes); // Usa las rutas con el prefijo /api

// Endpoint de prueba
app.get('/', (req, res) => {
  res.send('API de Restaurante funcionando');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
