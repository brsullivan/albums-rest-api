import express from 'express';
import bodyParser from 'body-parser';
import albumRoutes from './routes/albums.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/albums', albumRoutes);

app.get('/status', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log('Server running on port: ', PORT);
});