const express = require('express');
const app = express();
const { Pool } = require('pg');

// PostgreSQL bağlantısı
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'barcodes',
  password: 'your_password',
  port: 5432,
});

// API endpoint
app.get('/barcode/:barcode', async (req, res) => {
  const barcode = req.params.barcode;

  if (barcode) {
    try {
      const query = 'SELECT * FROM barcodes WHERE barcode = $1';
      const { rows } = await pool.query(query, [barcode]);

      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ error: 'Barcode not found' });
      }
    } catch (error) {
      console.error('Error executing PostgreSQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ error: 'Barcode parameter is required' });
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
