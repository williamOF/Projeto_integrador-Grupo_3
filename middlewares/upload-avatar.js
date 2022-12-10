const path = require('path')
const multer = require('multer')

//UPLOAD USERS AVATAR

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const local = path.join(__dirname, '../public/images/users')
      cb(null, local)
    },
    filename: function (req, file, cb) {

      let fileName = `${Date.now()}_img${path.extname(file.originalname)}`
      cb(null, fileName)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload