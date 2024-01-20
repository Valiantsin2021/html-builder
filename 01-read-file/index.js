const fs = require('fs')
const path = require('path')
const { stdout } = require('node:process')
const stream = fs.createReadStream(path.join(__dirname, 'text.txt'))
stream.on('data', data => console.log(data.toString()))
stream.on('end', () => console.log('End of the file'))
stream.on('error', (err) => console.log('Error: ' + err.message))

// stream.pipe(stdout)

// Variant with utility class

// const  FileHandlerAsync = require('../FileHandler.js')

// FileHandlerAsync.readFileToConsole('/01-read-file/text.txt')
