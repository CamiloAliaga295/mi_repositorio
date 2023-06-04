const express = require('express');
const fs = require('fs');

const app = express();

//middleware
app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//consultar

app.get('/canciones', (req, res) => {
 const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'))
  res.send(canciones);

})

//crear
app.post('/canciones', (req, res) => {
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
  canciones.push(cancion);
  fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
  res.send(canciones);
});

//editar
app.put('/canciones/:id', (req, res) => {
  const id = req.params.id;
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
  const index = canciones.findIndex(c => c.id == id);
  canciones[index] = cancion; 
  canciones[id] = cancion;
  fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
  res.send(canciones);
});

//eliminar
app.delete('/canciones/:id', (req, res) => {
  const id = req.params.id; 
  const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
  const index = canciones.findIndex(c => c.id == id);
  canciones.splice(index, 1);
  fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
  res.send(canciones);
});




app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

