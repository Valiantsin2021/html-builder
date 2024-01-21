const FileHandlerAsync = require('../FileHandler.js')
const rootFolder = '06-build-page/'
const projectDistFolder = `${rootFolder}project-dist/`
const stylesFolder = `${rootFolder}styles/`
const htmlFileName = 'index.html'
const stylesFileName = 'styles.css'
const templatePath = `${rootFolder}template.html`
const componentsPath = `${rootFolder}components/`
const assetsSourceFolder = `${rootFolder}assets/`
const assetsDistFolder = `${projectDistFolder}assets/`
let template = FileHandlerAsync.readFile(templatePath).then(async template => {
  const files = await FileHandlerAsync.readDir(componentsPath)
    const names = []
    console.log(files)
    for(const el of files) {
      const name = el.replace(/\.\w+/, '')
      if (template.includes(`{{${name}}}`)) {
        const elContent = await FileHandlerAsync.readFile(`${componentsPath}/${el}`)
        template = template.replace(`{{${name}}}`, elContent)
      }
    }
  return template
}).catch(err => console.log(err.message))
template.then(data => {
  FileHandlerAsync.makeDir(projectDistFolder)
  FileHandlerAsync.writeFile(`${projectDistFolder}${htmlFileName}`, data)
}).catch(err => console.log(err.message))
FileHandlerAsync.mergeFilesInFolder(
  stylesFolder,
  projectDistFolder,
  stylesFileName
)
FileHandlerAsync.copyDir(assetsSourceFolder, assetsDistFolder)
