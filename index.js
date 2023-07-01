import express from 'express';
import { convertCurrency } from './controllers/currencyController.js';

const app = express();
const port = 3000;

// Define the API endpoint
app.get('/exchange', async (req, res) => {
  const { from, to, amount } = req.query;

  try {
    const convertResult = await convertCurrency(from, to, amount);
    res.json(convertResult);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred while converting the currency' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
