const chai = require('chai')
const expect = chai.expect
const fs = require('fs').promises
const path = require('path')
const FileHandlerAsync = require('../FileHandler.js')

describe('FileHandlerAsync', () => {
  describe('makeDir', () => {
    it('should create a folder', async () => {
      // Specify a test folder path
      const testFolderPath = './test-data'
      // Call the makeDir method
      await FileHandlerAsync.makeDir(testFolderPath)

      // Check if the folder was created
      const folderExists = await fs.stat(`./${testFolderPath}`).then(
        stats => stats.isDirectory(),
        err => false
      )

      expect(folderExists).to.be.true

      // Clean up: remove the test folder
      await fs.rmdir(`./${testFolderPath}`, { recursive: true })
    })

    it('should create nested folders if recursive is true', async () => {
      // Specify a nested test folder path
      const testFolder = './test-data/'
      const nestedFolderPath = `${testFolder}folder`

      // Call the makeDir method with recursive set to true
      await FileHandlerAsync.makeDir(nestedFolderPath)

      // Check if the nested folder was created
      const folderExists = await fs.stat(`./${nestedFolderPath}`).then(
        stats => stats.isDirectory(),
        err => false
      )

      expect(folderExists).to.be.true

      // Clean up: remove the nested test folder
      await fs.rmdir(`./${nestedFolderPath}`, { recursive: true })
      await fs.rmdir(`./${testFolder}`, { recursive: true })
    })
  })
})
