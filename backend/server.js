import express from 'express'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import cors from 'cors' 



const app = express()
const port = process.env.PORT || 4000

connectDB()

app.use(express.json())
app.use(cors())

app.use('/', carRouter)

app.get('/',(req,res)=>{
    res.send('API WORKING')
})

app.listen(port, ()=> console.log("Server Started", port))