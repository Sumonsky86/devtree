import User from "../models/User"
import {Request, Response } from 'express'
import { checkPassword, hashPassword } from "../utils/auth"
import slug from "slug"
import { validationResult } from 'express-validator'
import { generateJWT } from "../utils/jwt"



export const createAccount  = async (req: Request, res: Response) => {
    const {email, password} = req.body
    const userExists = await User.findOne({email})

    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({handle})
    
    if(handleExists){
        const error = new Error('Nombre de usuario no disponible')
        return res.status(409).json({ error: error.message})
    }
    if(userExists){
        const error = new Error('Un usuario con ese correo ya existe')
        return res.status(409).json({ error: error.message})
    }

    const hash = await hashPassword(password)
    const user = new User({...req.body, handle, password: hash})
    await user.save()
    res.status(201).send('Usuario creado correctamente')
    
}

export const login = async (req: Request, res: Response) => {
    let errors = validationResult(req)
    
    
    if(errors.isEmpty()===false){
        return res.status(409).json({ errors: errors.array() })
    }
    //revisar si el usuario esta registrado
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(!user){
        const error = new Error('El usuario no existe')
        return res.status(404).json({ error: error.message})
    }
    //comprobar si el password es correcto
    const isPasswordCorrect = await checkPassword(password, user.password)
    if(!isPasswordCorrect){
        const error= new Error('el password es incorrecto')
        return res.status(401).json({error: error.message})
    }
    const token = generateJWT({id: user._id})

    res.send(token)
}

export const getUser = async (req: Request, res: Response) => {
    const bearer = req.headers.authorization
    if(!bearer || undefined){
        const error = new Error('No autorizado')
        res.status(401).json({error: error.message})
    }
    
}