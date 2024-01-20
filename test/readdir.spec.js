const chai = require('chai')
const expect = chai.expect
const fs = require('fs').promises
const path = require('path')
const FileHandlerAsync = require('../FileHandler.js')

describe('FileHandlerAsync', () => {
  describe('readDir method', () => {
    it('should return an array of filenames in the folder', async () => {
      // Specify a test folder path and create some dummy files
      const testFolderPath = 'test-data'
      const testFiles = ['text-0.txt', 'text-1.txt', 'text-2.txt']
      // Create the test folder and files
      await fs.mkdir(path.join(__dirname, testFolderPath), { recursive: true })
      await Promise.all(
        testFiles.map(file =>
          fs.writeFile(path.join(__dirname, testFolderPath, file), '')
        )
      )

      // Call the readDir method and assert the result
      const result = await FileHandlerAsync.readDir(`/test/${testFolderPath}`)
      expect(result)
        .to.be.an('array')
        .that.includes.members(
          testFiles.map(file => `/test/${testFolderPath}/${file}`)
        )

      // Clean up: remove the test folder and files
      await fs.rmdir(path.join(__dirname, testFolderPath), { recursive: true })
    })
  })
})
