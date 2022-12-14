const express = require('express')
const app = express()
const pkgJson = require('../package.json')
const cors = require('cors')

require('dotenv').config()
const port = process.env.PORT

const authRouter = require('./routers/authRouter')

app.use(express.json())
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}))

app.use(authRouter)
app.listen(port, () => {
  console.log(`${pkgJson.name} is running on port ${port}`)
})
