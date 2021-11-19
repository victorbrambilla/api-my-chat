import { Request, Response } from 'express'
import * as user from '../services/user'
import { error } from '../libs/bindError'
import bcrypt from 'bcryptjs'


const login = async (req: Request<any>, res: Response<any>) => {
    try {
        const email = req.body.email
        const password = req.body.password
        
        

        const userLogged = await user.login({ email, password})
        return res.json(userLogged)
    } catch (err: any) {
        return error(res, err)
    }

  
}

const register = async(req: Request<any>, res: Response<any>)=>{
    try {
      
        const salt = await bcrypt.genSalt(10)
        const name= req.body.name
        const email= req.body.email
        const avatar=`${req.file?.destination}${req.file?.filename}`
        const hashedPassword= await bcrypt.hash(req.body.password, salt)
    
        const userRegister= await user.register({name, email, password:hashedPassword, avatar})

        return res.json(userRegister)
    } catch (err: any) {
        return error(res, err)
    }

}


export {
    login,
    register
}