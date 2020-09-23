import oo from './imgs/react目录文件.png' //oo是什么？ 是打包后在dist下面的路径 file-loader不会改变模块内容 只是复制然后换个地方然后返回生成的路径
import axios from 'axios'

axios.get('/api/info').then((res) => {
  console.log('res', res)
})
let img = new Image()

img.src = oo
const root = document.querySelector('#app')
root.append(img)
console.log('加油834sss')
