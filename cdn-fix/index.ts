const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const baseurl = 'UR URL'
const PORT = 8000;
export default app;
app.use('/files/', express.static(__dirname +'/uploads'))
// default options
app.use(fileUpload());
app.get('/ping', function(req:any, res:any) {
  res.send('pong');
});


app.post('/upload', function(req:any, res:any) {
if(!req.headers['Authorization']) return res.status(401)
  //@ts-ignore
    let sampleFile:any ;
  let uploadPath:any ;
//console.log(req.files)
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
 // eslint-disable-line
// console.log(req.body, req.files) debug
  sampleFile = req.files.file;
if(!sampleFile) return res.status(403).end()

let id = sampleFile.md5 + '.' + sampleFile.mimetype.split('/')[1]  
uploadPath = __dirname + '/uploads/' + id;

  sampleFile.mv(uploadPath, function(err:any) {
    if (err) {
      return res.status(500).send(err);
    }  
    res.status(201).json({
      id,
      uploadPath,
      sampleFile,
      status: 201,
      url: `https://shadow-bot.dev/cdn/files/${id}`
    })
    });

});
app.on('mount', () => console.log('CDN MOUNTED'))