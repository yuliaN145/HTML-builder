
const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');
const file = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Введите текст?\n');
stdin.on('data', data => {
  file.write(data);
  if(data.toString().includes('exit')) process.exit();
});
process.on('SIGINT', () => process.exit());
process.on('exit', () => process.stdout.write('Goodbye!'));
