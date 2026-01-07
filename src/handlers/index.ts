import User from "../models/User"
import {Request, Response } from 'express'
import { hashPassword } from "../utils/auth"


export const createAccount  = async (req: Request, res: Response) => {
    const {email, password} = req.body
    const userExists = await User.findOne({email})
    if(userExists){
        const error = new Error('El usuario ya existe')
        return res.status(409).json({ error: error.message})
    }
    const hash = await hashPassword(password)
    
    const user = new User({...req.body, password: hash})
    await user.save()
    res.send({message: 'Usuario creado correctamente'})
    
}

