const fs = require('fs')
const pack = require('../package.json')

// update installation.md
const installation = fs
  .readFileSync('./gitbook/installation.md', 'utf-8')
  .replace(
    /https:\/\/unpkg\.com\/vue-h-carousel@[\d.]+.[\d]+\/dist\/vue-h-carousel\.js/,
    'https://unpkg.com/vue-h-carousel@' + pack.version + '/dist/vue-h-carousel.js.'
  )
fs.writeFileSync('./gitbook/installation.md', installation)
