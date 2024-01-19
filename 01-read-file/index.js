const fs = require('fs')
const path = require('path')
const { stdout } = require('node:process')
const stream = fs.createReadStream(path.join(__dirname, 'text.txt'))
// stream.on('data', (data) => console.log(data.toString()));
stream.pipe(stdout)

// Variant with utility class 

// const  FileHandlerAsync = require('../FileHandler.js')

// FileHandlerAsync.readFileToConsole('/01-read-file/text.txt')