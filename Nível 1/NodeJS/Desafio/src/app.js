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

  const repositoryId = repositories.find(repository => repository.id === id)

  if(!repositoryId){
    return response.status(401).json({ error: "Repository not found"})
  }

  repositories.splice(repositoryId, 1)

  return response.status(204).send()

});

app.post("/repositories/:id/like", idIsUuid, (request, response) => {
  const { id } = request.params;

  const findRepository = repositories.find(repository => repository.id === id)

  if(!findRepository){
    return resquest.status(401).json({ error: "Repository not found"})
  }

  const repository = {
    ...findRepository,
    likes: findRepository.likes++
  }

  

  return response.json({ repository })

});

module.exports = app
