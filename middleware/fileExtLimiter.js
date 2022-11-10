const path = require("path")

const fileExtLimiter = (...allowedExtArray) => {

    return (req, res, next) => {
        const files = req.files
        const fileExtensions = []
        const mimetypes = []
        //! firstly we need to push to an array the extensions of each file from the name of the file by using the path.extname
      
        Object.keys(files).forEach(key => {
            fileExtensions.push(path.extname(files[key].name))
            mimetypes.push(files[key].mimetype.split('/')[0])
        })
        
        //! all the files must be in an accepted formate if at least one is not in the allowed formate reject it
        //^ we do that by comparing both arrays and all file extensions must be included inside the allowedExtensions passed in 
       
        const allowedExt = fileExtensions.every(ext => allowedExtArray.includes(ext))
        
        const allowedMime = mimetypes.every(ext => {return ext === 'image'})
        
        if(!allowedExt || !allowedMime){
            // const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`
            
            const message = `Upload failed.`

            return res.status(422).json({ status: "error", message });
        }
        
        
        
        next()
    }

}

module.exports = fileExtLimiter