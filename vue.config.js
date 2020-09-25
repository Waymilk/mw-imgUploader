module.export = {
  publicPath:'./',
  outputDir:'dist',
  pages: {
    index: {
        entry: process.env.NODE_ENV === 'production'? 'src/index.js' :'src/main.js',
    }
  }
}