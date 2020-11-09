// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const doubanbook = require('doubanbook')
cloud.init()
//云开发不用添加白名单域名
async function getDoubanBook(isbn){
  const url = `https://search.douban.com/book/subject_search?search_text=${isbn}`
  let res = await axios.get(url)
  
  let reg = /window\.__DATA__ = "(.*)"/
  if(reg.test(res.data)){
    let book = RegExp.$1
    return doubanbook(book)[0];
    
  }
  return null;
}
// 云函数入口函数
exports.main = async (event, context) => {
  const isbn = event.isbn
  const bookData = await getDoubanBook(isbn)
  const db = cloud.database();
  db.collection("books").add({
    data:{
      isbn:isbn,
      title:bookData.title,
      cover_url:bookData.cover_url
    }
  })
  return {
    title:bookData.title,
    cover_url:bookData.cover_url
  }
}