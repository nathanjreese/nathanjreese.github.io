import express from 'express';
import sql from 'mssql';
import dotenv from 'dotenv';
import cors from 'cors';
// import {encryptSymmetric, decryptSymmetric} from 'src/utils/encryption'

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// const encPass = encryptSymmetric(process.env.VITE_DATABASE_PASSWORD)
const config = {
  server: process.env.VITE_DATABASE_URL,
  user: process.env.VITE_DATABASE_USER,
  password: process.env.VITE_DATABASE_PASSWORD,
  database: process.env.VITE_DATABASE_NAME,
  port: 1433,
  // password: decryptSymmetric(encPass),
  options: {
    encrypt: true // Azure requires encryption
}
}

app.use(cors())
app.get('/api/status', (req, res) => {
  res.send('Hello from Node.js!, ', import.meta.env.VITE_DATABASE_URL);
});

app.get('/api/schedule', async (req, res) => {
  try {
      sql.connect(config)
      
      const result = await sql.query`SELECT * FROM schedule where date > '2025-01-01'`;
      res.json(result.recordset);
  } catch (err) {
      console.error('Database query failed', err);
      res.status(500).json({ error: 'Database query failed' });
  }
});


app.get('/api/getData', (req, res) => {
  return("SUCCESSS")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});