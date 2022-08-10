//1.使用ES6 语法导入jquery
import $ from 'jquery'

//导入样式 ---> 在webpack中, 一切皆模块,都可以通过ES6语法导入使用
import './css/index.css'
import './css/index.less'
//报错: uncaught  SyntaxError:cannot use import statement outside a module

//1.导入图片,  得到图片文件
import logo from './css/image/pinklog.png'
//2. 给image 的 src 动态赋值
$('.box').attr('src', logo)

//2.定义jquery 的入口函数
$(function () {
  //3.实现奇偶行的变色效果
  $('li:odd').css('background-color', 'yellow')
  $('li:even').css('background-color', 'green')
  $('ul>li').css('margin-top', '13px').css('height', '50px')
})

//定义装饰器函数
function info(target) {
  target.info = 'Person info'
}

//定义一个普通的类
@info
class Person {}

console.log(Person.info)
