// miniprogram/pages/subscriptMes/subscriptMes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //微信后台设置消息模板 用户点击时候触发消息弹出
  btnSubscribe(){
    wx.requestSubscribeMessage({
      tmplIds:['NHy8K0Pvy41jNoBaZzRn_1I70uBfImtD6JrTyuU-CSo'],
      success: function(res) {
        console.log(res)
      }
    })
  },
  //!只能在服务端或者云函数上发送消息 会发到服务通知里面
  btnsendMessage(){
    wx.cloud.callFunction({
      name:"sendMessage"
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})