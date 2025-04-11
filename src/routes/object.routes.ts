import { Router } from 'express';
import {
  createObjeto,
  deleteObjeto,
  getObjeto,
  getObjetos,
  updateObjeto,
} from '../controllers/object.controller';

// Objects layout Route
const objRoute = Router();

objRoute.post('', createObjeto);
objRoute.get('', getObjetos);
objRoute.get('/:objId', getObjeto);
objRoute.delete('/:objId', deleteObjeto);
objRoute.patch('/:objId', updateObjeto);

export default objRoute;