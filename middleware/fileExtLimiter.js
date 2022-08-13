const path = require("path")

const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        const files = req.files
        
        
        next()
    }

}

module.exports = fileExtLimiter