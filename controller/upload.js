const path = require('path');

const upload = (req, res) => {
    const files = req.files

    //! what we want to do is loop over each file and added it to the server
    
    Object.keys(files).forEach(key => {
        //! create the path for each file
        
        const random = Math.random().toString(36).slice(2,10) 
        const newName = `${Date.now()}-${random}-${files[key].name}`
        
        const filepath = path.join(__dirname, '..','files', newName)
        //! add it to the server
        files[key].mv(filepath, (err) => {
            if (err) return res.status(500).json({ status: "error", message: err })
        })
    })
    
    return res.json({ status: 'success', message: Object.keys(files).toString() })

}
module.exports = upload