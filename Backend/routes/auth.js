const express = require('express');
const router = express.Router();

router.get('/', (req,  res)=>{
    let obj={
        name:"om golhani",
        email: "om@om.com"
    }
    res.json(obj);
})

module.exports = router;