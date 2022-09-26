const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const assert = require('assert')
require('dotenv').config()
require('express-async-error')
//Express
const app = express()
const path = require('path')


//route

const authRouter = require('./Router/authRoute')

//configuration

app.use(cors())
app.use(cookieParser(process.env.REF_TOKEN_SECRET))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// app.use('/api/v1', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: false }));

app.use(`/api/v1/auth`, authRouter)


const PORT = process.env.PORT || 5500

const connectDb = require('./db')


//---------Deployment-------

// __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, '../food-bang/build')));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "food-bang", "build", "index.html"))
//     })
// }

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URL)
        app.listen(PORT, () => {
            console.log(`server is listening on port http://localhost:${PORT}`);
        })
    } catch (err) {
        throw err
    }
}

start();

