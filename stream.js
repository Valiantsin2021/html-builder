const fs = require('fs')
const readPath = '01-read-file/text.txt'
const writePath = '01-read-file/text-copy.txt'
/**
 * Copies a file from the specified source path to the destination path.
 *
 * @param {string} readPath - The path of the file to be read (source path).
 * @param {string} writePath - The path where the file should be written (destination path).
 * @returns {Promise<void>} The function does not return a value, but performs the file copy operation.
 * @throws {Error} If there is an error during the file copy operation.
 */
async function copyFile(readPath, writePath) {
  const readStream = fs.createReadStream(readPath)
  const writeStream = fs.createWriteStream(writePath)

  readStream.on('data', chunk => {
    writeStream.write(chunk)
  })

  readStream.on('error', error => {
    console.error('An error occurred while reading the file:', error.message)
    writeStream.end()
    throw error
  })

  readStream.on('end', () => {
    writeStream.end()
  })

  writeStream.on('close', () => {
    process.stdout.write('File copied successfully.\n')
  })
}

copyFile(readPath, writePath)
