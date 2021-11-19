import * as dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'
import getDateTime from './date'
import * as user from './controllers/user'
import { isLogged } from './libs/middlewareLogin' 
import upload from './upload'
import path from 'path'


dotenv.config()


const app = express()

app.use(express.json())
app.use(cors())
const PORT = 3000

app.use('/public', express.static(path.join(__dirname, 'public')));


const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

app.post('/login', user.login)
app.post('/users', upload.single('avatar'), user.register)


app.post('/photo',isLogged, upload.single('foto'), (req:any, res:any)=>{
  try {
    
    const message={
      name:req.body.name,
      user:req.body.user,
      message:req.body.message,
      date:getDateTime(new Date()),
      img:`http://localhost:3000/public/${req.file.filename}`
    }
    messages.push({message})
    io.emit('message', messages);
    
  } catch (error) {
    throw new Error('error')
  }
})



let users:any=[]
let messages: any=[]

io.on('connection', (socket: any) => {
  console.log('a user connected');
  
  socket.on('message', (message: any) => {
    messages.push({message})
    io.emit('message', messages);
    
  });

  socket.on('disconnecting', () => {
    users = users.filter((u:any) => u != socket.username);
      
    
    io.emit('join', users)
  });

  socket.on('join', (user:any)=>{
    socket.username=user
    users.push(user)
    io.emit('join', users)
    io.emit('message', messages);
  })

  




});

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`));