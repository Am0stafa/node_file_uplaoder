const path = require('path');

const upload = (req, res) => {
    const files = req.files

    //! what we want to do is loop over each file and added it to the server
    
    Object.keys(files).forEach(key => {
        //! create the path for each file
        const filepath = path.join(__dirname, '..','files', files[key].name)
        //! add it to the server
        files[key].mv(filepath, (err) => {
            if (err) return res.status(500).json({ status: "error", message: err })
        })
    })
    
    return res.json({ status: 'success', message: Object.keys(files).toString() })

}
module.exports =upload