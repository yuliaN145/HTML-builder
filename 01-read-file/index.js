const fs = require('fs');
const path = require('path');
const way = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(way);
readableStream.on('data', chunk => console.log(decodeURIComponent(chunk)));






