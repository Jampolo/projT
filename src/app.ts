import Express from 'express';
const app = Express();

app.use(Express.json());

const port = process.env.PORT || 3000;

// datos de ejemplo
const objData = [
  { objId : 2551, nombre : "med", composicion : "silicio", tipo : "ígneo" },
  { objId : 2552, nombre : "izq", composicion : "caliza", tipo : "sedimentario" },
  { objId : 2553, nombre: "der", composicion : "pizarra", tipo: "metamórfico" },
];

app.get('/', (req, res) => res.status(200).send('Hola Mundo!'));

// GET todos los datos
app.get('/api/objects', (req, res) => {
  res.json(objData);
});

// GET segun objId
app.get('/api/objects/:id', (req, res) => {
  console.log(req.params);
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) return res.status(400).send({ msg : "Bad Request. Invalid ID."});

  const findObject = objData.find(object => object.objId === parsedId)

  if (findObject) {
    res.statusCode = 200
    res.json(findObject)
  }
  else {
    res.statusCode = 404
    return res.json({ Error: ['Objeto no encontrado'] });
  }
  res.send();
});

// POST
app.post('/api/objects/', (req, res) => {
  const { body } = req;
  const newObj = { objId: objData[objData.length - 1].objId + 1, ...body};
  objData.push(newObj);
  return res.status(201).send(newObj);
});

// PUT
app.put('/api/objects/:id', (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findObjIndex = objData.findIndex((object) => object.objId === parsedId);
  if (findObjIndex === -1) return res.sendStatus(404);

  objData[findObjIndex] = { objId: parsedId, ...body };
  return res.sendStatus(200);
});

// PATCH
app.patch('/api/objects/:id', (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findObjIndex = objData.findIndex((object) => object.objId === parsedId);  
  if (findObjIndex === -1) return res.sendStatus(404);

  objData[findObjIndex] = { ...objData[findObjIndex], ...body };
  return res.sendStatus(200);
});

// DELETE
app.delete('/api/objects/:id', (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  
  const findObjIndex = objData.findIndex((object) => object.objId === parsedId);
  if (findObjIndex === -1) return res.sendStatus(404);
  
  objData.splice(findObjIndex, 1);
  return res.sendStatus(200);
});

// Start the express server on the relevant port
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});