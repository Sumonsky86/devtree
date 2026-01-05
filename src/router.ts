import { Router } from 'express'

const router = Router()
//Routing
router.get('/', (req,res) => {
    res.send("Ahhh pero que pedazo de crack")
})
router.get('/nosotros', (req,res) => {
    res.send("Ahhh pero que pedazo de dios de la programacion")
})
router.get('/blog', (req,res) => {
    res.send("Ahhh pero que pedazo de genio cheto escritor")
})

router.post('/auth/register', (req,res) => {
    res.send("logueate crack")
    console.log(req.body);
    
})

export default router