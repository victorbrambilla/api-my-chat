import { IUser,  createUser } from "../types/IUser"
import { connect } from '../libs/mongodb'
import { User } from '../models/userModel'
import { sign } from "jsonwebtoken"
import bcrypt from 'bcryptjs'

const login = async (user: IUser) => {
    if (!user.email) {
        throw new Error("Informe o campo email!")
    }
    if (!user.password) {
        throw new Error("Informe o campo senha!")
    }
   
    await connect()
    const userLogged= await User.findOne({email:user.email})
    


    if(!userLogged){
        throw new Error("Cadastro não encontrado")
    }

    const userName= userLogged.name
    const avatar= userLogged.avatar
    
    

    if(bcrypt.compareSync(user.password, userLogged.password)==false){
        throw new Error("Senha incorreta!")
    }

   

    const token = sign({
        _id: userLogged._id,
        name: userLogged.name,
        email: userLogged.email
    
    }, process.env.JWT_SECRET ?? 'emptyjwt', {} )


    return {token, userName,avatar}
  
}

const register = async (user: createUser) => {
    if (!user.name) {
        throw new Error("Informe o campo nome!")
    }
    
    if (!user.email) {
        throw new Error("Informe o campo email!")
    }
  
    if (!user.password) {
        throw new Error("Informe o campo senha!")
    }
  
   

    await connect()
    const userLogged= await User.findOne({email:user.email})
    
    if(userLogged){
        throw new Error("Email já cadastrado!")
    }

    
    await User.create(user)
    return true
  
}



export {
   login,
   register
}
