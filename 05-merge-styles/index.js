const fs = require('fs').promises
const path = require('path')

const stylesDir = path.join(__dirname, 'styles')
const distDir = path.join(__dirname, 'project-dist')
const outputFile = path.join(distDir, 'bundle.css')
const validExtensions = ['.css']

async function compileStyles() {
  try {
    const files = await fs.readdir(stylesDir)

    const bundleContent = await Promise.all(
      files.map(async file => {
        const filePath = path.join(stylesDir, file)

        if (
          (await fs.stat(filePath)).isFile() &&
          validExtensions.includes(path.extname(file).toLowerCase())
        ) {
          const content = await fs.readFile(filePath, 'utf8')
          return content
        }
        return null
      })
    )

    const validBundleContent = bundleContent.filter(content => content !== null)

    await fs.mkdir(distDir, { recursive: true })
    await fs.writeFile(outputFile, validBundleContent.join('\n'))

    console.log('Styles compiled successfully!')
  } catch (error) {
    console.error('Error compiling styles:', error)
  }
}

compileStyles()

// Variant with utility class

// const  FileHandlerAsync = require('../FileHandler.js')
// FileHandlerAsync.mergeFilesInFolder('05-merge-styles/styles', '05-merge-styles/project-dist', 'bundle.css')
