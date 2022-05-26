const fs = require('fs');
const path = require('path');
const newFolderPath = path.join(__dirname, 'files-copy');
const folderPath = path.join(__dirname, 'files');

fs.readdir(path.join(__dirname), function (err, files){
  for(let i = 0; i < files.length; i++) {
    if(files[i] === 'files-copy'){
      fs.readdir(path.join(__dirname, files[i]), function(err, data) {
        for(let i = 0; i < data.length; i++) {
          fs.unlink(path.join(__dirname, 'files-copy', data[i]), (err) => {
            if (err) throw err; 
          }
          );
        }
      });
    } else {
      fs.mkdir(newFolderPath, {recursive: true}, err => { if(err) throw err; } );
    }
    fs.readdir(folderPath, function(err, chunk) {
      for(let i = 0; i < chunk.length; i++) {
        fs.readFile(path.join(__dirname, 'files', chunk[i]), function(err, content) {
          fs.writeFile(path.join(__dirname, 'files-copy', chunk[i]), content, (err) => {
            if (err) throw err; 
            console.log('Файл был создан');
          });
        });
      }
    });
  }
});

