import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import {StreamChat} from 'stream-chat'
import {v4 as uuidv4} from 'uuid'
import bcrypt from 'bcrypt'

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

const api_key = process.env.API_KEY
const api_secret = process.env.API_SECRET
const serverClient = StreamChat.getInstance(api_key,api_secret)

// API [POST] for /signup
app.post("/signup", async(req,res)=>{
    try{
        
        const {name,username,password} = req.body 
        const userId = uuidv4()
        const hashedPswd = await bcrypt.hash(password,10)
        const token = serverClient.createToken(userId)
        console.log({token,userId,name,username,hashedPswd})
        res.json({token,userId,name,username,hashedPswd})
    }catch(error){
        console.log("catch: ",error)
        res.json(error)
    }
})

app.post("/login",async(req,res)=>{
    try{
        const {username,password} = req.body
        const users = await serverClient.queryUsers({name:username})  //returns all users matching the username entered
        if(users.length === 0) {
            return res.json({message:"User not found"})
        }
        const token = serverClient.createToken(users[0].id)
        const pwsdCheck = await bcrypt.compare(password,users[0].hashedPswd)
        if (pwsdCheck){
            res.json({
                token,
                userId: users[0].id,
                name: users[0].name,
                username:username
            })
        }
    }catch(error){
        res.json(error)
    }
})


app.listen(5000,()=>{
    console.log("Server runing on port 5000")
})

