const connectToMongo = require('./db');
const express = require('express')

connectToMongo();       // function for establishing connectivity to MongoDB
const app = express() // express object
const port = 5000

// middleware for using the body of the request
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes' , require('./routes/notes.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

