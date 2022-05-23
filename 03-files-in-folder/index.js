const path = require('path');
const fs = require('fs');

function getPaths (folderPath) {
  fs.readdir(folderPath, {withFileTypes: true} , function(err, files){
    for (let i = 0; i < files.length; i += 1) {
      let fullPath = path.join(folderPath, files[i].name);
      if (files[i].isFile()) {
        const ext = path.extname(fullPath);
        fs.stat(fullPath, function (err, stats){
          console.log(files[i].name, ext, stats.size);
        });
        //console.log(files[i].name, ext);
      } else {
        getPaths(fullPath);
      }
    }
  }); 
}
console.log(getPaths(path.join(__dirname)));
