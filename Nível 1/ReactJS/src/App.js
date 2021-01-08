import React, { useState, useEffect } from 'react'

import api from './services/api'

import './App.css'

import Header from './components/Header'

function App(){
    

    const [projects, setProjects] = useState(['Melhor jogo do ano', 'transforma sua placa em uma rtx3090'])

    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response)
        })
    }, [])

    function handleAddProject(){
        const newProject = prompt('Digite seu novo projeto:')

        setProjects([...projects, `${newProject}`])

        console.log(projects)
    }


    return (
        <>
        <Header title="CyberPunk"/>

        

        <ul>
            {projects.map(project => <li key={project}>{project}</li>)}
        </ul>

        <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
        </>  
    )
    
}

export default App