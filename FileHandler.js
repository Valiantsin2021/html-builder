const fs = require('fs')
const path = require('path')
const readline = require('readline')

class FileHandlerAsync {
  /**
   * Reads all filenames from the specified folder.
   * @param {string} folderPath - The path to the folder to read.
   * @returns {Promise<string[]>} An array of filenames in the folder.
   * @throws {Error} If there is an error reading the folder.
   */
  static async readDir(folderPath) {
    try {
      const files = await fs.promises.readdir(path.join(__dirname, folderPath))
      return files.map(file => `${folderPath}/${file}`)
    } catch (err) {
      console.error(
        `Failed to read folder ${folderPath} with error: ${err.message}`
      )
      throw err
    }
  }
  /**
   * Reads all filenames from the specified folder.
   * @param {string} folder - The path to the folder to create.
   * @returns {Promise<void>}
   * @throws {Error} If there is an error creating the folder.
   */

  static async makeDir(folder) {
    try {
      await fs.promises.mkdir(path.join(__dirname, folder), { recursive: true })
    } catch (err) {
      console.error(
        `Failed to create folder ${path} with error: ${err.message}`
      )
      throw err
    }
  }
  /**
   * Reads the content of a file.
   * @param {string} file - The path to the file to read.
   * @returns {Promise<string>} The content of the file as a string.
   * @throws {Error} If there is an error reading the file.
   */

  static async readFile(file) {
    try {
      const data = await fs.promises.readFile(
        path.join(__dirname, file),
        'utf-8'
      )
      return data
    } catch (err) {
      console.error(`Failed to read file ${file} with error: ${err.message}`)
      throw err
    }
  }
  /**
   * Writes data to a file.
   * @param {string} fileName - The path to the file to write.
   * @param {string} data - The data to write to the file.
   * @throws {Error} If there is an error writing to the file.
   */

  static async writeFile(fileName, data) {
    try {
      await fs.promises.writeFile(path.join(__dirname, fileName), data)
      console.log(`File written to path: ${fileName}`)
    } catch (err) {
      console.error(err)
      throw err
    }
  }
  /**
   * Reads the content of a file and outputs it to the console.
   *
   * @param {string} file - The name or path of the file to be read.
   * @returns {Promise<void>} - A promise that resolves when the file has been read and printed to the console.
   * @throws {Error} - If there is an error reading the file.
   */
  static async readFileToConsole(file) {
    const stream = fs.createReadStream(path.join(__dirname, file))
    stream.on('data', data => console.log(data.toString()))
    stream.on('error', err => console.error(err))
  }
  /**
   * Writes user input to a file, allowing continuous input until terminated by the user.
   *
   * @param {string} file - The name or path of the file to which the user input will be written.
   * @returns {Promise<void>} - A promise that resolves when the writing process is terminated.
   * @throws {Error} - If there is an error during the writing process.
   */
  static async writeFileFromConsoleInput(file) {
    const stream = fs.createWriteStream(path.join(__dirname, file), {
      flags: 'a',
      encoding: 'utf8'
    })
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    function promptForText() {
      rl.question(
        'Enter text (Ctrl+C or type "exit" to terminate): ',
        input => {
          if (input.toLowerCase() === 'exit') {
            rl.close()
          } else {
            stream.write(`${input}\n`)
            promptForText()
          }
        }
      )
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
  }

  /**
   * Appends data to a file.
   * @param {string} fileName - The path to the file to append.
   * @param {string} data - The data to append to the file.
   * @throws {Error} If there is an error appending to the file.
   */

  static async appendFile(fileName, data) {
    try {
      await fs.promises.appendFile(path.join(__dirname, fileName), data)
      console.log(`Data appended to file ${fileName}`)
    } catch (err) {
      console.error(
        `Failed to append to file ${path} with error: ${err.message}`
      )
      throw err
    }
  }
  /**
   * Saves a copy of the file with a random name and specified extension.
   * @param {string} sourcePath - The path to the file to copy.
   * @param {string} destinationPath - The destination path for the copied file.
   * @param {string} randomFileName - The timestamp string to use as the filename.
   * @param {string} [extension='csv'] - The file extension (default is 'csv').
   * @throws {Error} If there is an error copying the file.
   */

  static async saveFileRandom(
    sourcePath,
    destinationPath,
    randomFileName,
    extension = 'csv'
  ) {
    try {
      await fs.promises.copyFile(
        sourcePath,
        `${destinationPath}/${randomFileName}.${extension}`
      )
      console.log(
        `Temporary test file ${randomFileName} copied! to ${destinationPath}${randomFileName}.${extension}`
      )
    } catch (err) {
      console.error(
        `Failed to copy file ${randomFileName} with error: ${err.message}`
      )
      throw err
    }
  }
  /**
   * Deletes a file.
   * @param {string} fileName - The path to the file to delete.
   * @throws {Error} If there is an error deleting the file.
   */

  static async deleteFile(fileName) {
    try {
      await fs.promises.unlink(path.join(__dirname, fileName))
      console.log(`File: ${fileName} deleted!`)
    } catch (err) {
      console.error(
        `Failed to delete file ${fileName} with error: ${err.message}`
      )
      throw err
    }
  }
  /**
   * Copies a file from the specified source path to the destination path.
   *
   * @param {string} readPath - The path of the file to be read (source path).
   * @param {string} writePath - The path where the file should be written (destination path).
   * @returns {Promise<void>} The function does not return a value, but performs the file copy operation.
   * @throws {Error} If there is an error during the file copy operation.
   */
  static async copyFile(readPath, writePath) {
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
  /**
   * Reads the statistics of files in a folder and logs information about each file.
   *
   * @param {string} folder - The name or path of the folder containing the files.
   * @returns {Promise<void>} - A promise that resolves when the file statistics have been logged.
   * @throws {Error} - If there is an error while reading the file statistics.
   */
  static async readFilesStatsInFolder(folder) {
    fs.readdir(path.join(__dirname, folder), (error, files) => {
      if (error) {
        console.log(error.message)
      }
      files.forEach(file => {
        fs.stat(path.join(__dirname, folder, file), (err, stats) => {
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
  /**
   * Copies the contents of the source directory to the destination directory.
   *
   * @param {string} sourceDir - The path of the source directory.
   * @param {string} destinationDir - The path of the destination directory.
   * @returns {Promise<void>} - A promise that resolves when the contents are copied successfully.
   * @throws {Error} - If there is an error during the copying process.
   */
  static async copyDir(sourceDir, destinationDir) {
    try {
      await FileHandlerAsync.makeDir(destinationDir)

      const sourceItems = await fs.promises.readdir(sourceDir)
      const destinationFiles = await fs.promises.readdir(destinationDir)

      const removedFiles = destinationFiles.filter(
        file => !sourceItems.includes(file)
      )

      await Promise.all(
        removedFiles.map(
          async file =>
            await FileHandlerAsync.deleteFile(`${destinationDir}/${file}`)
        )
      )
      await Promise.all(
        sourceItems.map(async item => {
          const sourcePath = path.join(sourceDir, item)
          const destinationPath = path.join(destinationDir, item)

          const stats = await fs.promises.stat(sourcePath)

          if (stats.isDirectory()) {
            await FileHandlerAsync.copyDir(sourcePath, destinationPath)
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
  /**
   * Merges the contents of files in a folder with specified extensions into a single file.
   *
   * @param {string} sourceFolder - The name or path of the source folder.
   * @param {string} destinationFolder - The name or path of the destination folder.
   * @param {string} fileName - The name of the output file.
   * @param {string[]} [extension=['.css']] - An array of file extensions to include.
   * @returns {Promise<void>} - A promise that resolves when the files have been merged and the output file is created.
   * @throws {Error} - If there is an error during the merging process.
   */
  static async mergeFilesInFolder(
    sourceFolder,
    destinationFolder,
    fileName,
    extension = ['.css']
  ) {
    const sourceDir = path.join(__dirname, sourceFolder)
    const validExtensions = extension
    try {
      const files = await fs.promises.readdir(sourceDir)

      const bundleContent = await Promise.all(
        files.map(async file => {
          const filePath = path.join(sourceDir, file)

          if (
            (await fs.promises.stat(filePath)).isFile() &&
            validExtensions.includes(path.extname(file).toLowerCase())
          ) {
            const content = await FileHandlerAsync.readFile(
              `${sourceFolder}/${file}`
            )
            return content
          }
          return null
        })
      )

      const validBundleContent = bundleContent.filter(
        content => content !== null
      )

      await FileHandlerAsync.makeDir(destinationFolder)
      await FileHandlerAsync.writeFile(
        `${destinationFolder}/${fileName}`,
        validBundleContent.join('\n')
      )

      console.log('Files merged successfully!')
    } catch (error) {
      console.error('Error compiling styles:', error)
    }
  }
  /**
   * Cut (move) all files from a source folder to a destination folder inside the parent folder.
   * @param {string} sourceFolder - Path to the source folder.
   * @param {string} destinationFolder - Path to the destination folder inside the parent folder.
   */
  static async moveFiles(sourceFolder, destinationFolder) {
    if (path.resolve(sourceFolder) === path.resolve(destinationFolder)) {
      console.error('Source and destination must not be the same.')
      return
    }

    try {
      await FileHandlerAsync.makeDir(destinationFolder)
    } catch (error) {
      console.error(`Error creating destination folder: ${error.message}`)
      return
    }

    try {
      const files = await fs.promises.readdir(sourceFolder)

      await Promise.all(
        files.map(async file => {
          const sourcePath = path.join(sourceFolder, file)
          const destinationPath = path.join(destinationFolder, file)

          try {
            await fs.promises.copyFile(sourcePath, destinationPath)
            console.log(`Moved: ${file}`)
          } catch (error) {
            console.error(`Error moving file ${file}: ${error.message}`)
          }
        })
      )

      console.log('All files moved successfully.')
    } catch (error) {
      console.error(`Error reading source folder: ${error.message}`)
    }
  }
}

// FileHandlerAsync.deleteFile('test.txt')
// FileHandlerAsync.readDir('/04-copy-directory').then(files => console.log(files))
// FileHandlerAsync.makeDir('test')
// FileHandlerAsync.writeFile('test.txt', 'hello')
// FileHandlerAsync.appendFile('test.txt', 'bye')
// FileHandlerAsync.readFile('/01-read-file/text.txt').then(file => console.log(file))
// FileHandlerAsync.readFilesStatsInFolder('01-read-file')
// FileHandlerAsync.writeFileFromConsoleInput('text.txt')
// FileHandlerAsync.copyDir('04-copy-directory', '04-copy-directory-copy')
// FileHandlerAsync.readFileToConsole('04-copy-directory/README.md')
// FileHandlerAsync.mergeFilesInFolder('05-merge-styles/styles', '05-merge-styles/project-dist', 'bundle.css')
module.exports = FileHandlerAsync
