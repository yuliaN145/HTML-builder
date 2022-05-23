const fs = require('fs');
const path = require('path');


fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
const folderStyle = path.join(__dirname, 'styles');
const readableStream = fs.createReadStream(path.join(__dirname, 'project-dist', 'bundle.css'));
readableStream.on('data', function (chunk) {
  if (chunk) {
    fs.truncate(path.join(__dirname, 'project-dist', 'bundle.css'), err => {
      if(err) throw err; // не удалось очистить файл
      console.log('Файл успешно очищен');
    });
  }
});
fs.readdir(folderStyle, {withFileTypes: true}, function (err, files) {
  for (let i = 0; i < files.length; i++) {
    if (files[i].isFile && path.extname(files[i].name) === '.css') {
      //console.log(files[i].name);
      const readableStream = fs.createReadStream(path.join(__dirname, 'styles', files[i].name));
      readableStream.on('data', function (chunk) {
        fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), chunk, (err) => {if (err) throw err; return 'file was created';});
      });
    }
  }
}); 
