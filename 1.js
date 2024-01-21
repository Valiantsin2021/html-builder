const path = require('path')
const fs = require('fs')
let template = `sdafhnfsv asdfvkljh >{{index}}< sjdkfh`
fs.readdir('01-read-file', (err, files) => {
  const names = []
  if (err) throw err
  console.log(files)
  for(const el of files) {
    const name = path.parse(el).name
    if (template.includes(`{{${name}}}`)) {
      
      template = template.replace(`{{${name}}}`, '')
    }
  }
})
