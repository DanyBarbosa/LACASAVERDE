const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Configuración del pool de conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres', // Usuario de la base de datos
  host: 'localhost', // Host del servidor PostgreSQL
  database: 'RBD', // Nombre de la base de datos
  password: '1234', // Contraseña del usuario
  port: 5432, // Puerto de PostgreSQL (predeterminado es 5432)
});

// Obtener todos los clientes
router.get('/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Cliente');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener clientes');
  }
});

// Crear un nuevo cliente
router.post('/clientes', async (req, res) => {
  const { nombre, telefono, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Cliente (nombre, telefono, email) VALUES ($1, $2, $3) RETURNING *',
      [nombre, telefono, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al agregar cliente');
  }
});

// Actualizar un cliente existente
router.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE Cliente SET nombre = $1, telefono = $2, email = $3 WHERE id_cliente = $4 RETURNING *',
      [nombre, telefono, email, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar cliente');
  }
});

// Eliminar un cliente
router.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Cliente WHERE id_cliente = $1', [id]);
    res.send(`Cliente con ID ${id} eliminado`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar cliente');
  }
});

module.exports = router;
