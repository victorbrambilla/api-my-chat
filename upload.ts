import multer from 'multer';

const storageConfig = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "public/");
    },
    filename: function(req, file, cb) {
      let randomName= Math.floor(Math.random()*9999)
      cb(null, `${randomName}.jpg`);
    }
  });
  
  
  const upload = multer({
    storage: storageConfig,
    fileFilter:(req, file, cb)=>{
        const allowed:string[]=['image/jpg','image/jpeg','image/png']
        
        cb(null, allowed.includes(file.mimetype))
    },
  })

  export default upload ;