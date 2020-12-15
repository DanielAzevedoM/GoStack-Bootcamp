const express = require("express");

const cors = require("cors");

const { v4: uuidv4, validate: isUuid, validate } = require("uuid")

const app = express();

app.use(express.json());
app.use(cors());


function idIsUuid(request, response, next){
  
  const { id } = request.params

  if(!validate(id)){
    return response.status(400).json({ error: "Invalid repository Id"})
  }

  return next()
}

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs = [] } = request.body

  const repository = { id: uuidv4(), title, url, techs, likes: 0}

  repositories.push(repository)

  return response.json(repository)

});

app.put("/repositories/:id", idIsUuid, (request, response) => {
 const { id } = request.params;

 const { title, url, techs = [] } = request.body

 const oldRepository = repositories.find(repository => repository.id === id)

  console.log(oldRepository)

 if(!oldRepository){
   return response.status(400).json({error:"Repository ID not exists"})
 }

 const repository = { 
   ...oldRepository,
    title, 
    url, 
    techs
  }


 repositories[oldRepository] = repository

 return response.json(repository)



});

app.delete("/repositories/:id", idIsUuid, (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex === -1){
    return response.json({ error: "Repository index not found"})
  }

  if(repositoryIndex >= 0){
    repositories.splice(repositoryIndex, 1)
  }

  return response.status(204).send()

});

app.post("/repositories/:id/like", idIsUuid, (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex === -1){
    return response.json({ error: "Repository index not found"})
  }

  repositories[repositoryIndex].likes++

  return response.json(repositories[repositoryIndex])

});

module.exports = app
