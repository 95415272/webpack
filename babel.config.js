module.exports = {
  //声明babel 可用的插件
  //这些插件的使用方法可以再 babel 的官方文档中直接查询复制
  //将来, webpack 在调用 babel-loader的时候, 回先加载 plugins 插件来使用
  plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
}
