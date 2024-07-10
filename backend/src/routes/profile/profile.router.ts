import express from 'express'
import { httpGetProfile, httpUpdateProfile , httpUpdateImage} from './profile.controller';
import multer from 'multer';

const profileRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

profileRouter.get('/profile' , httpGetProfile)
profileRouter.post('/profile' , httpUpdateProfile)
profileRouter.post('/profile/imageupdate' ,upload.single('file'), httpUpdateImage)

export default profileRouter