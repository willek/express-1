const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

morgan.token('date', () => {
  const p = new Date().toString().replace(/[A-Z]{3}\+/, '+').split(/ /);
  return (`${p[2]}/${p[1]}/${p[3]}:${p[4]} ${p[5]}`);
});

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/members', require('./routes/api/members'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
