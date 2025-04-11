import { Router } from 'express';
import objRoute from './object.routes';

// Index
const indexRoute = Router();

indexRoute.get('', async (req, res) => {
  res.json({ message: 'asd' });
});

indexRoute.use('/objects', objRoute);

export default indexRoute;
