import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";


function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() =>{
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])


  async function handleAddRepository() {

  const response = await api.post('repositories', {
    title:"Desafio2", 
	  url:"localhost3000", 
	  techs:["Node.js", "React"]
  })

  const repositorie = response.data



  setRepositories([...repositories, repositorie])

   
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`)
    
     

    setRepositories(repositories.filter(
      repositorie => repositorie.id !== id
    ))
  }


  return (
    <div>
      <ul data-testid="repository-list">
       {repositories.map(repositorie => <li key={repositorie.id}> 
      
         {repositorie.title} 
        
         <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>)} 
          
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
