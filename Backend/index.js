const connectToMongo = require('./db');
const express = require('express')

connectToMongo();       // function for establishing connectivity to MongoDB
const app = express() // express object
const port = 3000

// Available routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes' , require('./routes/notes.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

