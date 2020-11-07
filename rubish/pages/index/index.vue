<template>
	<view class="content">
		<button @click="btnTakePhoto">从相册或拍照选择一张图片</button>
		<view style="width: 100%;padding:10px 20px;">
					<image :src="imagePath" style="width: 100%;" mode="widthFix"></image>
					<view v-if="recResults.length>0" style="width: 100%;border:1px solid #ccc;border-radius: 10px;padding:10px;">
						<view style="text-align: center;font-size: 14px;color: #999;">识别结果</view>
						<view style="text-align: center;height: 30px;line-height: 30px;">
							{{selectedName}}
						</view>
						<view v-if="searchResults">
							<view v-if="searchResults.matched" style="width: 100%;text-align: center;">{{searchResults.matched.typename}}</view>
							<view v-else style="font-size: 14px;">
								<view v-for="item,index in searchResults.similars" style="display: flex;">
									<view style="flex: 1;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;margin-right: 20px;">{{item.keywords}}</view>
									<view>{{item.typename}}</view>
								</view>
							</view>
						</view>
					</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imagePath:"",
				recResults:[],
				selectedName:'',
				searchResults:null
			}
		},
		onLoad() {

		},
		methods: {
			//垃圾分类
			searchKeyword(kw){
				return new Promise((resolve,reject)=>{
					uniCloud.callFunction({
						name:'TrashClassify',
						data:{
							keyword:kw
						},
						success:(res)=>{
							resolve(res.result)
						}
					})
				})
			},
			//展示图片结果
			async selectResult(index){
				this.selectedName = this.recResults[index].keyword;
				console.log('name',this.selectedName)
				const searchRes = await this.searchKeyword(this.selectedName)
				this.searchResults = searchRes
			},
			//展示识别结果
			parseResult(result){
				this.recResults = result
				let itemList = []
				let abs_result_index
				for(let i =0;i<result.length;i++){
					if(result[i].score>0.7){
						abs_result_index = i
						break
					}
					itemList.push(result[i].keyword+""+result[i].score)
				}
				if(abs_result_index>=0){
					this.selectResult(abs_result_index)
					return
				}
				uni.showActionSheet({
					itemList:itemList,
					success:(res)=>{
						this.selectResult(res.tapIndex)
					}
				})
			},
			//百度识别api识别图片
			async classifyImage(b64){
				
				const res = await uni.request({
					url:"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=OPhg6uElWpe1B3vDO0MUFDhh&client_secret=cSY0V9uZahGGm2fvDv2Ny17CSVSyvnuH",
						
					}
				)
				
				
				console.log('res',	res)
				const access_token= res[1].data.access_token				
				const classfy_res = await uni.request({
					url:'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general',
					
					header:{
							"Content-Type":"application/x-www-form-urlencoded",
					},
					method:'POST',
					dataType:'json',
					data:{
						access_token:access_token,
						image:b64
					}
					
				}
				
				)
				console.log(classfy_res)
				this.parseResult(classfy_res[1].data.result)
				/*uniCloud.callFunction({
					name:"imageClassify",
					data:{
						image:b64
					},
					success:(res2)=>{
						console.log('res2',res2)
						this.parseResult(res2.data.result)
					},
					fail:(res)=>{
						console.log('err',res)
					}
				})*/
			},
			//图片转换成base64
			image2base64(path){
				//暗号 think different
				// #ifdef MP-WEIXIN
				wx.getFileSystemManager().readFile({
					filePath:path,
					encoding:"base64",
					success:(res)=>{
						//console.log('base64',res.data)
						this.classifyImage(res.data)
					}
				})
				console.log('微信下')
				// #endif
				
				// #ifdef APP-PLUS
				console.log('app下')
				//
				plus.io.resolveLocalFileSystemURL(
					path,
					(entry) => {
						entry.file((file) => {
							let reader = new plus.io.FileReader();
							reader.onloadend = async (e) => {
								const base64 = e.target.result.substr(22);
								const result = await this.classifyImage(base64);
								
								this.parseResult(result.result);
							};
							reader.readAsDataURL(file);
						});
					}
				);
				// #endif
				
			},
			btnTakePhoto(){
				uni.chooseImage({
					count:1,
					success:(res)=>{
						this.imagePath = res.tempFilePaths[0]
						this.image2base64(this.imagePath)
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
