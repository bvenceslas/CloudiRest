const multer = require('multer');
const path = require('path');

// storage
const storage = multer.diskStorage({});
// fileFilter
const fileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if(ext !== '.jpg' && ext !== '.jpeg' && ext !=='.png'){
        return cb(Error('file not supported', false))
    }
    cb(null, true);
};

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter
});
