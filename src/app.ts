import Express from 'express';
const app = Express();

// datos de ejemplo
const objData = [
  {
    objId : 2551,
    nombre : "med",
    composicion : "silicio",
    tipo : "igneo"
  },
  {
    objId : 2552,
    nombre : "izq",
    composicion : "caliza",
    tipo : "sedimentario"
  },
  {
    objId : 2553,
    nombre: "der",
    composicion : "pizarra",
    tipo: "metamorfico"
  }
]

app.use(Express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.status(200).send('Hola Mundo!'));

// GET todos los datos
app.get('/api/objects', (req, res) => {
  res.json(objData);
});

// GET segun objId
app.get('/api/objects/:id', (req, res) => {
  console.log(req.params);
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send({ msg : "Bad Request. Invalid ID."});

  const findObject = objData.find(object => object.objId === id)

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

//app.post('/api/objects/', (req, res) => res.send());

// Start the express server on the relevant port
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});