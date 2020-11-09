// miniprogram/pages/high/high.js
let canvas;
let ctx;
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
  //!暗号：talk is cheap
  onReady: function () {
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        canvas = res[0].node
        ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)

        ctx.fillStyle='white'
        ctx.fillRect(0, 0, 300, 300)

        
        wx.cloud.callFunction({
          name:"getmpCode",
          data:{
            scene:"uid=123,act=test"
          },
          success:(res)=>{
            console.log(res);

            let image=canvas.createImage();
            image.src="data:image/jpg;base64,"+ wx.arrayBufferToBase64(res.result.buffer);

            image.onload=(res)=>{
              console.log(res);

              ctx.drawImage(image, 0, 0,100,100);
            }
          }
        });

        
      })
  },
  /**
   * 保存海报
   */
  save(){
    wx.canvasToTempFilePath({
      canvas: canvas,
      success:(res)=>{
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })
      }
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