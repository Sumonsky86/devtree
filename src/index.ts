import colors from 'colors'
import server from './server'

const port = process.env.PORT || 4000

server.listen(port, ()=>{
    console.log(colors.blue.italic(`Servidor funcionando en el puerto ${port}`));  
})



let product:{
    name: string,
    price: number,
    isAvailable: boolean,
    colors:[Blue:String ,red: String ,green: String],
    colors2: {Blue:String ,red: String ,green: String}
    colors3: [{Blue:String},{red: String },{green: String}]
}