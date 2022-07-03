import pkg from 'cloudinary'
import multerStorageCloudinary from 'multer-storage-cloudinary'
const { v2: cloudinary } = pkg

const { CloudinaryStorage } = multerStorageCloudinary

export const cloudAvatarsStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Holistic/users/avatars'
    }
})

export const cloudSchoolsStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Holistic/schools'
    }
})
