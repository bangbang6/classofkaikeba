//index.js
const app = getApp()
//!我们只能拿到openid  表示一个特定用户 通过auth.codetosession接口拿到Openid 传入Login接口返回的js_code值 所以一般login后在codetosession拿到用户的openid
Page({
  data: {
    cover_url:"",
    title:""
  },
  bindTap(){
    wx.getLocation({
      success(res){
        wx.chooseLocation({
          latitude: res.latitude,
          longitude:res.longitude,
          success(res){
            console.log(res)
          }
        })
      }
    })
  },
  bindTap2(){
    wx.login({

      success(res){
        wx.getWeRunData({
          success: (result) => {
           
              console.log(result)
              // 解密微信步数的隐私数据 调用云函数
              wx.cloud.callFunction({
                name:"getwerun",
                data:{
                  werundata:wx.cloud.CloudID(result.cloudID)
                },
                success(res1){
                  console.log(res1)
                }
              })
          },
        })
      }
    })
   
  },
  btnScancode(){
    wx.scanCode({
      onlyFromCamera:true,
      success: function(res){
        console.log('shaoma',res);

        wx.cloud.callFunction({
          name:'getbook',
          data:{
            isbn:res.result
          },
          success(res1){
            that.setData({
              cover_url:res1.result.cover_url,
              title:res1.result.title
            })
          }
        })
      },
      fail(res){
        console.log('fail',res);
      }
    })
  },
  add(){
    wx.cloud.callFunction({
      name:"add",
      data:{
        num1:1,
        num2:2
      },
      success(res){
        console.log(res.result.num)
      }
    })
  },
  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  toPic(){
    wx.navigateTo({
      url: '/pages/high/high',
      
    })
  },
  onLoad(options){
    console.log(options)
    if(options.scene){
      let screen = options.scene.split("%2C");
    let [uid,act] =screen
    console.log(uid,act)
    }
  },
  toSubscribe(){
    wx.navigateTo({
      url: '/pages/subscriptMes/subscriptMes',
      
    })
  },
  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
