const express = require('express');
const router = express.Router();

router.get('/', (req,  res)=>{
    let obj={
        title:"Homework",
        desp: "this is note description"
    }
    res.json(obj);
})

module.exports = router;