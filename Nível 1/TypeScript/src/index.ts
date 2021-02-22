import express from 'express';

import { helloWorld } from './routes'

const app = express();

app.get('/', helloWorld, (request, response) =>{
    return response.json({ message: "Hello World"})
})

app.listen(3333, () =>{
    console.log('Servidor Iniciado')
})