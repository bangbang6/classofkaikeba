// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数 发送给群聊里所有用户的消息
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        touser: wxContext.OPENID,
        page: 'index',
        lang: 'zh_CN',
        data: {
          thing1:{
            value:"大家好",
          },
          time3:{
            value:"2020年11月9日 19:51"
          }
        },
        templateId: 'NHy8K0Pvy41jNoBaZzRn_1I70uBfImtD6JrTyuU-CSo',
        miniprogramState: 'developer'
      })
    return result
  } catch (err) {
    return err
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}