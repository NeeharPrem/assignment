const express = require('express')
const app = express();
const port = 3000;
const db = require('./config/db')
const project= require('./Routes/projectionRouter')
const revenue= require('./Routes/revenueRoute')
const topcustomers= require('./Routes/customerRoute')
const morgan= require('morgan')
const cors=require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cors())

app.use('/api/projection',project)
app.use('/api/revenue',revenue)
app.use('/api/topcustomers', topcustomers)

app.listen(port, () => {
    console.log(`Server started: http://localhost:${port}`)
});