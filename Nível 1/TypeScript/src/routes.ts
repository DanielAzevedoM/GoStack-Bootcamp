import { Request, Response} from 'express'

import createUser from './services/CreateUser'

export function helloWorld(request: Request, response: Response){

    const user = createUser({
        email: 'danielazevedom@hotmail.com',
        password: '123456'
    })

    console.log(user)
    return response.json({message: "Hello World"})
}