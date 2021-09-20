'use strict'
const express = require('express')
const router = require("./router")
// const cors = require('cors');

const app = express()
const port = process.env.PORT || 3001
const endPointRoot = "/projects/02/API/v1"

// var corsOptions = {
//   origin: ['http://localhost:3000'],
//   optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions));

app.use(endPointRoot, router);

app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}`)
})
