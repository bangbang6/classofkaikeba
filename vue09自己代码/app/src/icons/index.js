import Vue from 'vue'
import SvgIcon from '../components/SvgIcon'

//自动加载svg所有svg文件

//require.context()指定svg为上下文 第一个参数是指定目录
let req = require.context('./svg', false, /\.svg$/)

//req是请求函数  keys()返回上下文中所有文件名
req.keys().map(req)

Vue.component('svg-icon', SvgIcon)
