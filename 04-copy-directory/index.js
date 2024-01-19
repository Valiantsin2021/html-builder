const fs = require('fs')
const path = require('path')

const sourceDir = path.join(__dirname, 'files')
const destinationDir = path.join(__dirname, 'files-copy')

async function copyDir(sourceDir, destinationDir) {
  try {
    await fs.promises.mkdir(destinationDir, {recursive: true})

    const sourceItems = await fs.promises.readdir(sourceDir)
    const destinationFiles = await fs.promises.readdir(destinationDir)

    const removedFiles = destinationFiles.filter(
      file => !sourceItems.includes(file)
    )

    await Promise.all(
      removedFiles.map(
        async file =>
          await fs.promises.unlink(`${destinationDir}/${file}`)
      )
    )
    await Promise.all(
      sourceItems.map(async item => {
        const sourcePath = path.join(sourceDir, item)
        const destinationPath = path.join(destinationDir, item)

        const stats = await fs.promises.stat(sourcePath)

        if (stats.isDirectory()) {
          await copyDir(sourcePath, destinationPath)
        } else {
          const readStream = fs.createReadStream(sourcePath)
          const writeStream = fs.createWriteStream(destinationPath)

          await new Promise((resolve, reject) => {
            readStream.pipe(writeStream)
            writeStream.on('finish', resolve)
            writeStream.on('error', reject)
            console.log(`File copied successfully to ${destinationPath}`)
          })
        }
      })
    )

    console.log(`Directory ${destinationDir} copied successfully!`)
  } catch (error) {
    console.error('Error copying directory:', error)
    throw error
  }
}

copyDir(sourceDir, destinationDir)

// Variant with utility class

// const FileHandlerAsync = require('../FileHandler.js')

// FileHandlerAsync.copyDir(
//   '04-copy-directory/files',
//   '04-copy-directory/files-copy'
// )
