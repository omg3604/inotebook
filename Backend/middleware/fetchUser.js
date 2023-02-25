const jwt = require('jsonwebtoken');
const JWT_SECRET = "Omis&agood&boy";

const fetchUser = (req, res , next)=>{
    // Get the user id from the jwt token and append it to the request.
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
    try {
        // extract user id from the auth-token
        const data = jwt.verify(token , JWT_SECRET);
        // append it in request
        req.user = data.user; 
        // for calling next function
        next();

    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}

module.exports = fetchUser;