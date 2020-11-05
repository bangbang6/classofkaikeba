// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //!暗号：less is more
  let {num1,num2} = event
  let num = num1+num2
  return {
    num
  }
}