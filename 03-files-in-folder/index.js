const fs = require('fs')
const path = require('path')
function readFilesInfo() {
  fs.readdir(path.join(__dirname, 'secret-folder'), (error, files) => {
    if (error) {
      console.log(error.message)
    }
    files.forEach(file => {
      fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
        if (error) {
          console.log(error.message)
          return
        }
        if (stats.isFile()) {
          const fileSize = stats.size
          const fileSizeInKB = fileSize / 1024
          const fileName = path.parse(file).name
          const fileExtension = path.parse(file).ext.substring(1)

          console.log(
            `${fileName} - ${fileExtension} - ${fileSizeInKB.toFixed(3)}kb`
          )
        } else {
          return
        }
      })
    })
  })
}
readFilesInfo()

// Variant with utility class 

// const  FileHandlerAsync = require('../FileHandler.js')

// FileHandlerAsync.readFilesStatsInFolder('/03-files-in-folder/secret-folder')
