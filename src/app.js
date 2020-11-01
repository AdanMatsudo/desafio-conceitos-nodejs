const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');
const { json } = require("express");

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

    return response.json(repositories); 
});

app.post("/repositories", (request, response) => {
  const {id, title, url, techs, likes } = request.body;

  const repositorio = {id: uuid(), title, url, techs, likes: 0}

  repositories.push(repositorio);

  return response.json(repositorio);
});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body;
  const { id } = request.params;

  const paramIndex = repositories.findIndex(repositorio => repositorio.id == id);
  
  if(paramIndex < 0){
    return response.status(400).json({error: "Index não encontrado!"})
  }

  const repositorio = 
  {
    id,
    title,
    url,
    techs,
    likes: repositories[paramIndex].likes,
  }

  repositories[paramIndex] = repositorio;

  return response.json(repositorio);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const paramIndex = repositories.findIndex(repositorio => repositorio.id == id);

  if(paramIndex < 0){
    return response.status(400).json({error: "Id não encontrado!"});
  }

  repositories.splice(paramIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const paramIndex = repositories.findIndex(repositorio => repositorio.id == id);

  if(paramIndex < 0){
    return response.status(400).json({error: "Id não encontrado!"});
  }

  repositories[paramIndex].likes++;

  return response.json(repositories[paramIndex]);
});

module.exports = app;
