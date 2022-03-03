import multer from 'multer';
import __dirname from '../utils.js';


const upload = multer({
    storage: multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,__dirname+'/public/images')
        },
        filename:function(req,file,cb){
            cb(null, Date.now()+file.originalname)
        }
    }) 
});

export default upload;