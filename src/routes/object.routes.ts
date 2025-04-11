import { Router } from 'express';
import {
  createObjeto,
  deleteObjeto,
  getObjeto,
  getObjetos,
  updateObjeto,
} from '../controllers/object.controller';
import { validateSchema } from '../middlewares/validation.middleware';
import { createObjectSchema, updateObjectSchema } from '../schemas/object.schema';

// Objects layout Route
const objRoute = Router();

objRoute.post('', validateSchema(createObjectSchema), createObjeto);
objRoute.get('', getObjetos);
objRoute.get('/:objId', getObjeto);
objRoute.delete('/:objId', deleteObjeto);
objRoute.patch('/:objId', validateSchema(updateObjectSchema), updateObjeto);

export default objRoute;