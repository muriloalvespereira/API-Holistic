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

export const schoolMulterList = [
    { name: 'logo', maxCount: 1 },
    { name: 'photo_main', maxCount: 1 },
    { name: 'photo_sec', maxCount: 1 },
    { name: 'photo_third', maxCount: 1 },
    { name: 'photo_quart', maxCount: 1 },
    { name: 'cert_main', maxCount: 1 },
    { name: 'cert_sec', maxCount: 1 },
    { name: 'cert_third', maxCount: 1 },
    { name: 'cert_quart', maxCount: 1 }
]
