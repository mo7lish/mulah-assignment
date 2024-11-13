const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 3000;

app.get('/table1', (req, res) => {
  const table1Data = [];
  fs.createReadStream('Table_Input.csv')
    .pipe(csv())
    .on('data', (row) => table1Data.push(row))
    .on('end', () => {
      res.json(table1Data);
    });
});

app.get('/table2', (req, res) => {
  const table1Data = [];
  fs.createReadStream('Table_Input.csv')
    .pipe(csv())
    .on('data', (row) => table1Data.push(row))
    .on('end', () => {

        const A5 = parseInt(table1Data[4]['A'], 10);
      const A20 = parseInt(table1Data[19]['A'], 10);
      const A15 = parseInt(table1Data[14]['A'], 10);
      const A7 = parseInt(table1Data[6]['A'], 10);
      const A13 = parseInt(table1Data[12]['A'], 10);
      const A12 = parseInt(table1Data[11]['A'], 10);

      const table2Data = {
        Alpha: A5 + A20,
        Beta: Math.floor(A15 / A7),
        Charlie: A13 * A12,
      };

      res.json(table2Data);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});