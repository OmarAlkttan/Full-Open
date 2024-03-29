const express = require('express');

const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res)=>{
  res.json(notes)
})

app.get('/api/notes/:id', (request, response)=>{
  const id = Number(request.params.id);
  console.log("id", id);
  const note = notes.find(n => {
    console.log(n.id, typeof n.id, id, typeof id, n.id === id);
    return n.id === id;  
  });
  console.log("notes", notes);
  console.log("note", note);
  if(note){
    response.json(note);
  }else{
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})


app.delete('/api/notes/:id', (req, res)=>{
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()  
})

const PORT = 3002;
app.listen(PORT);
console.log(`Server is running at port ${PORT}`);