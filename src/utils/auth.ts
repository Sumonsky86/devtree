
import bcrypt from 'bcrypt'

export const hashPassword = async (password:string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}

    //const hashedPassword = await bcrypt.hash(req.body.password, 10)
    //const user = new User({...req.body, password: hashedPassword})