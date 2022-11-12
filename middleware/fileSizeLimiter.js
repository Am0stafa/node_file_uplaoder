const MB = 5
const FILE_SIZE_LIMIT = MB * 1024 * 1024; //? convert to bits
const MAX_NUMBER_OF_FILES = 1

const fileSizeLimiter = (req, res,next) => {
    const files = req.files
    
    //! this will hold the names of any file that goes over the limit we have set
    const fileOverLimit = []
    let numberOfFiles = 0
    //! now we need to determine which files are over the limit
    Object.keys(files).forEach(key => {
        if(files[key].size > FILE_SIZE_LIMIT) fileOverLimit.push(files[key].name)
        numberOfFiles+=1
        
        if(numberOfFiles === MAX_NUMBER_OF_FILES){
            return;
        }
    })

    // TODO: also check the size of the content-length according to all file +260
    // console.log(req.headers['content-length'])

    if (fileOverLimit.length) {
        const properVerb = fileOverLimit.length > 1 ? 'is' : 'are'
        // const sentence = `Upload failed. ${fileOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replaceAll(",", ", ");
        const sentence = `Upload failed.`;
        // const message = filesOverLimit.length < 3 ? sentence.replace(",", " and"): sentence.replace(/,(?=[^,]*$)/, " and");

        res.status(413).json({"status":"error",sentence})
    
    }
    
    next()
}

module.exports =fileSizeLimiter