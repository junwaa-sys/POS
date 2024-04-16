const express = require('express')
const server = express()
const PORT = process.env.PORT || 3000
const userRoutes = require('./routes/userRoutes')

server.use(express.json())
server.use(express.static(__dirname + '/public'))

server.use('/api/users', userRoutes)

server.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

server.listen(PORT, () => {
  console.log(`APP listening on port ${PORT}`)
})
