const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const Fingerprint = require('express-fingerprint')
const getDeviceInfo = require('./middleware/get-device-info-middleware')
const rateLimitMiddleware = require('./middleware/rateLimiter-middleware')

const app = express()
app.set('trust proxy', 1)
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))
app.use(rateLimitMiddleware)
app.use(Fingerprint())
app.use(getDeviceInfo)
app.use('/auth', require('./routes/auth-routes'))
app.use('/profile', require('./routes/profile-routes'))
app.use('/event', require('./routes/events-routes'))
app.use('/note', require('./routes/notes-routes'))
app.use('/math', require('./routes/math-routes'))
app.use('/imggen', require('./routes/img-generator-routes'))
app.use('/expenses', require('./routes/expenses-routes'))
app.use('/admin', require('./routes/admin-routes'))
app.use('/', require('./routes/app-routes'))


const PORT = process.env.PORT || 3001

mongoose.connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log('DB connected'))
app.listen(PORT, ()=>console.log(`Listening port ${PORT}`))







