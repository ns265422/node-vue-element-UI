const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()
const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')
const db = require('./config/keys').mongoURI
const port = process.env.PORT || 5001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use('/api/users', users)
app.use('/api/profile', profiles)

// Connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

require('./config/passport')(passport)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
