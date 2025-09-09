import express from 'express'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import cors from 'cors' 
import shipmentRouter from './routes/shipmentRouter.js'
import flightRouter from './routes/flightRouter.js'



const app = express()
const port = process.env.PORT || 3000

connectDB()

app.use(express.json())
app.use(cors())

app.use('/shipments', shipmentRouter)
app.use('/', flightRouter);

app.get('/',(req,res)=>{
    res.send('API WORKING')
})

app.listen(port, ()=> console.log("Server Started", port))