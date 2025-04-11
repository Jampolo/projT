import { z } from 'zod';

export const createObjectSchema = z
  .object({
    nombre: z.string().min(1),
    composicion: z.string().min(1),
    tipo: z.enum(['ígneo', 'sedimentario', 'metamórfico']),
  })
  .strict(); //strict prevents the schema from validating payloads with properties not in the schema

//create a partial schema from createObjectSchema where all properties are optional
export const updateObjectSchema = createObjectSchema.partial();