const express = require('express')
const path = require('path')
const server = express()
const PORT = process.env.PORT || 3000
const testRoutes = require('./routes/testRoutes')

server.use(express.json())
server.use(express.static(__dirname + '/public'))

server.use('/api/data', testRoutes)

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

server.listen(PORT, () => {
  console.log(`APP listening on port ${PORT}`)
})
