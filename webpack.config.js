const path = require('path')

//1.导入 html-webpack-plugin 插件,得到`构造函数
const HtmlPlugin = require('html-webpack-plugin')
//2. new 构造函数,创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
  //指定要复制那个页面
  template: './src/index.html',
  //指定复制出来的文件名,和存放路径
  filename: './index.html',
})

//自动删除 dist 文件夹的插件, npm包,  在下面plugin 中进行构造函数调用
//按照npm.js 官方文档进行一步步操作
//左侧的花括号是 解构赋值
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

//使用 node.js 的语法,向外面导出一个 webpack 对象
module.exports = {
  //1.在开发调试阶段,  建议大家把 devttol 的值设置为  eval-source-map
  //真正发布时, 会关闭 source map, 开发时才会用, 因为源代码会暴露给别有用心的人
  // devtool: 'eval-source-map',

  //2.在实际发布的时候, 建议大家选择 devtool 设置为 nosources-source-map,  或直接关闭
  //这样就不会暴露源码了
  devtool: 'nosources-source-map',

  //3.想在定位报错行数的同时, 展示具体报错的源码, 可以将 devtool 的值设为 source-map
  // devtool: 'source-map',

  //mode  代表webpack的运行模式
  //可选值有两个:  development 和 production
  //开发时是 development, 部署上线时, 在package.json文件中,bulid 指定mode 为production,这样就提高了效率
  //packsge.json 中的 --mode 优先级更高
  mode: 'development',
  //开发时,一定用development , 因为追求的是速度,而不是体积
  //反过来,发布上线时,一定要用 production, 因为此时追求 体积小,性能

  // entry:'指定要处理那个文件',  入口文件
  entry: path.join(__dirname, './src/index.js'),
  //output: 出口文件, 输出文件到哪个文件夹, 并进行 文件命名
  output: {
    //存放目录
    path: path.join(__dirname, './dist'),
    //生成的文件名
    //就是生成的文件放在dist 目录下的 js 文件夹中
    filename: 'js/bundle.js',
  },
  //3. 插件的数组, 将来 webpack 在运行时, 会加载并调用这些插件
  plugins: [htmlPlugin, new CleanWebpackPlugin()],
  devServer: {
    //首次打包成功后, 自动打开浏览器
    open: true,
    //下面两个是可选的
    host: '127.0.0.1',
    //在http协议中, 如果端口号是 80 ,可以省略
    port: 5500,
  },
  module: {
    rules: [
      //定义了不同模块对应的 loader
      //test: 指定文件类型,  use: loader顺序是固定的, 从后往前调用
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      //1.webpack 只能打包处理 js结尾的文件
      //2.代码中包含了 css文件, webpack处理不了时,会查找 webpack.config.js配置文件
      //3.看module.rules数组中, 是否配置了对应的loader加载器
      //4 webpack 将 css文件 转交给 最后一个loader 进行处理(css-loader)
      //5.css-loader 处理完毕后,转交给下一个 style-loader
      //6.style-loader处理完之后, 没有下一个loader了, 就把处理的结果转交给webpack
      //7. webpack 吧处理的结果, 合并到 /dist/bundle.js 中,最终生成打包好的文件

      //处理 .less 文件的loader
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },

      //处理图片文件的 loader
      //如果需要调用的 loader 只有一个, 只传递一个字符串也行,如果有多个loader,则必须指定数组
      //其中 ? 是loader的参数项: 用来指定图片的大小,单位是字节, 只有<=limit的的大小图片,才会被转为base64格式的图片
      //在配置 url-loader 的时候,多尔衮参数之间, 使用  &  符号进行分隔
      {
        test: /\.jpg|png|gif$/,
        use: 'url-loader?limit=2250&outputPath=images',
      },

      //使用babel-loader 处理高级的js语法
      //exclude 排除项,必须指定,因为modules 目录下的第三方包不需要被打包
      //在配置babel-loader 的时候, 程序员只需要把自己的代码进项转换即可, 一定要排除 node_modules 目录中的js文件
      //因为第三方包中的 js兼容性,不需要程序员关心
      { test: /\.js$/, use: 'babel-loader', exclude: '/node_modules' },
    ],
  },
  resolve: {
    //设置别名
    alias: {
      //此时 @ 的意思就是 src的这一层目录,
      '@': path.join(__dirname, './src'),
    },
  },
}
