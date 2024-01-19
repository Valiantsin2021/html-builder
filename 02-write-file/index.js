const fs = require('fs')
const path = require('path')
const readline = require('readline')

const stream = fs.createWriteStream(path.join(__dirname, 'file.txt'), {
  flags: 'a',
  encoding: 'utf8'
})
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
function promptForText() {
  rl.question('Enter text (Ctrl+C or type "exit" to terminate): ', input => {
    if (input.toLowerCase() === 'exit') {
      rl.close()
    } else {
      stream.write(`${input}\n`)
      promptForText()
    }
  })
}
console.log('Welcome! Type your text:')
promptForText()
rl.on('close', () => {
  console.log('\nFarewell! Process terminated.')
  stream.end()
  process.exit(0)
})

process.on('SIGINT', () => {
  rl.close()
})

// Variant with utility class 

// const  FileHandlerAsync = require('../FileHandler.js')

// FileHandlerAsync.writeFileFromConsoleInput('/02-write-file/text.txt')