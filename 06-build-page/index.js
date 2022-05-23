const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), err => {
  if(err) throw err;
});
async function indexHtml () {
  const template = await fs.promises.readFile(path.join(__dirname, 'template.html'));
  let templateText = decodeURIComponent(template);
  
  const components = await fs.promises.readdir(path.join(__dirname, 'components'));
  for (let i = 0; i < components.length; i++) {
    let componentsText = await fs.promises.readFile(path.join(__dirname, 'components', components[i]));
    let component = path.basename(components[i], path.extname(components[i]));
    let reg = `{{${component}}}`;
    templateText = templateText.replace(reg, componentsText);
  }
  await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), templateText);
}
indexHtml();



fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
const folderStyle = path.join(__dirname, 'styles');
const readableStream = fs.createReadStream(path.join(__dirname, 'project-dist', 'style.css'));
readableStream.on('data', function (chunk) {
  if (chunk) {
    fs.truncate(path.join(__dirname, 'project-dist', 'style.css'), err => {
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
        fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), chunk, (err) => {if (err) throw err; return 'file was created';});
      });
    }
  }
}); 



async function copyAssets(assets, project) {
  await fs.promises.mkdir(project, { recursive: true });
  let content = await fs.promises.readdir(project);
  for (let i = 0; i < content.length; i++){
    await fs.promises.rm(path.join(project, content[i]));
  }
  content = await fs.promises.readdir(assets);
  for (let i = 0; i < content.length; i++) {
    let stats = await fs.promises.stat(path.join(assets, content[i]));
    if (!stats.isDirectory()) {
      await fs.promises.copyFile(path.join(assets, content[i]), path.join(project, content[i]));
    } else {
      await copyAssets(path.join(assets, content[i]), path.join(project, content[i]));
    }
  }
}
copyAssets(path.join(__dirname, 'assets'), path.join(path.join(__dirname, 'project-dist'), 'assets'));