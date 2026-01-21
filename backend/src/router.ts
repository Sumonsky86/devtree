import { Router } from 'express'
import { createAccount, login }  from './handlers'
import { body } from 'express-validator'
import { handleInputErrors } from './middleware/validation'

const router = Router()
//Routing

router.post('/auth/register', 
    body('email')
        .isEmail().notEmpty().withMessage('E-mail no válido'),
    body('handle')
        .notEmpty().withMessage('El handle no puede ir vacio'),
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
        .isLength({min:8})
        .withMessage('El password es muy corto, minimo 8 caracteres'),
    handleInputErrors,
    createAccount
)
router.post('/auth/login',
    body('email')
        .isEmail().notEmpty().withMessage('E-mail no válido'),
    body('password')
        .isLength({min:8})
        .withMessage('El password es obligatorio'),
    handleInputErrors,
    login
)
export default router