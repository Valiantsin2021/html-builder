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
  const header = await FileHandlerAsync.readFile(`${componentsPath}header.html`)
  const articles = await FileHandlerAsync.readFile(
    `${componentsPath}articles.html`
  )
  const footer = await FileHandlerAsync.readFile(`${componentsPath}footer.html`)
  template = template
    .replace(/{{header}}/gi, header)
    .replace(/{{footer}}/gi, footer)
    .replace(/{{articles}}/gi, articles)
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
