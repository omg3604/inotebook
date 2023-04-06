const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');

connectToMongo();       // function for establishing connectivity to MongoDB
const app = express() // express object
const port = 5000 || process.env.port

// middleware for using the body of the request
app.use(cors());
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes' , require('./routes/notes.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

