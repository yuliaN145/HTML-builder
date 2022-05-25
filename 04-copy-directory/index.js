const fs = require('fs');
const path = require('path');
const newFolderPath = path.join(__dirname, 'files-copy');
const folderPath = path.join(__dirname, 'files');


fs.mkdir(newFolderPath, {recursive: true}, err => { if(err) throw err; } );

fs.readdir(folderPath, function (err, files) {
  for (let i = 0; i < files.length; i += 1) {
    const way = path.join(__dirname, 'files', files[i]);
    fs.readFile(way, function (err, chunk){
      fs.writeFile(path.join(__dirname, 'files-copy', files[i]), chunk, (err) => {
        if (err) throw err; 
        console.log('Файл был создан');
      });
      //const readableStream = fs.createReadStream(way);
    /*(readableStream.on('data', chunk => fs.writeFile(path.join(__dirname, 'files-copy', files[i]), chunk, (err) => {
      if (err) throw err; 
      console.log('Файл был создан');
    }));*/
    });
  }}); 

