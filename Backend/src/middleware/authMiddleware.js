const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if(!authHeader) 
        return res.status(401).json({message: 'Unauthorized: Missing token'});

    const [bearer, token] = authHeader.split(' ');

    if(bearer !== "Bearer" || !token)
        return res.status(401).json({message: 'Unauthorized: Invalid token format'});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error(`Token Varification Error : ${err}`, );
            return res.status(403).json({message: 'Forbidden: Invalid token'});
        };
        req.user=user;
        next();
    })
};

const authorizeRole = (role) => {
    return (req, res, next) => {
        if(req.user.role !== role) {
            return res.status(403).json({message: 'Access Denied: your current role does not have access'});
        }
        next();
    }
};

module.exports = { 
    authenticateJWT,
    authorizeRole 
}