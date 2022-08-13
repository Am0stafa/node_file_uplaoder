const path = require('path')


const filesPayloadExists = (req,res,next) => {
    if(!req.files) return res.sendStatus(400)
    next()
}

module.exports = filesPayloadExists