module.exports = {
  plugins: {
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      rootValue ({ file }) {
        // console.log('处理的css:',file)
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
