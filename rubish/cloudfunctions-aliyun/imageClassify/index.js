'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log(111)
	let APIKey = 'OPhg6uElWpe1B3vDO0MUFDhh'
	let SecretKey = 'cSY0V9uZahGGm2fvDv2Ny17CSVSyvnuH'
	//原生的请求方式
	const res = await uniCloud.httpclient.request(
		"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=OPhg6uElWpe1B3vDO0MUFDhh&client_secret=cSY0V9uZahGGm2fvDv2Ny17CSVSyvnuH",
		{
			dataType:"json"
		}
	)

	// this is to test

	const access_token= res.data.access_token;
	const classfy_res = await uniCloud.httpclient.request(
		'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general',
		{
			headers:{
				"Content-Type":"application/x-www-form-urlencoded",
			},
			method:'POST',
			dataType:'json',
			data:{
				access_token:access_token,
				image:event.image
			}
		}
	)
	//返回数据给客户端
	return classfy_res
};
