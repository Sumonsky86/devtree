import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    
        //handle errors
        let errors = validationResult(req)
        if(errors.isEmpty()===false){
            return res.status(409).json({ errors: errors.array() })
        }
        next()
}