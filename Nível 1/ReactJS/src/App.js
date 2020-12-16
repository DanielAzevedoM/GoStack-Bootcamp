import React, { useState } from 'react'

import './App.css'

import backgroundImage from './assets/background.jpeg'

import Header from './components/Header'

function App(){
    

    const [projects, setProjects] = useState(['Melhor jogo do ano', 'transforma sua placa em uma rtx3090'])

    function handleAddProject(){
        const newProject = prompt('Digite seu novo projeto:')

        setProjects([...projects, `${newProject}`])

        console.log(projects)
    }


    return (
        <>
        <Header title="CyberPunk"/>

        <img width={300} src={backgroundImage} />
        
        <ul>
            {projects.map(project => <li key={project}>{project}</li>)}
        </ul>

        <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
        </>  
    )
    
}

export default App