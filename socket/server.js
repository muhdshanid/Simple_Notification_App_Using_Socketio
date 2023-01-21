import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
const app = express()
app.use(cors())

const server = app.listen(5000,()=>{
    console.log("Server running on port 5000");
})

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000"
    }
})

let onlineUsers = []

const addNewUser = (username,socketId)=> {
    !onlineUsers.some(user => user.username === username) && onlineUsers.push({username,socketId})
}
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId)
}

const getUser = (username) => {
    return onlineUsers.find(user => user.username === username)
}
io.on("connection", (socket)=>{
    socket.on("newUser",(username)=>{
        addNewUser(username,socket.id)
    })

    socket.on("sendNotification",({senderName,receiverName,type}) => {
        const receiver = getUser(receiverName)
        socket.to(receiver.socketId).emit("getNotification",{
            senderName,
            type  
        })
    })

    socket.on("disconnect",()=>{
        removeUser(socket.id)  
    })

})

