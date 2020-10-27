import 'package:flutter/material.dart';
import 'package:flutter_demo/work1/Company.dart';
import 'package:flutter_demo/work1/CompanyItem.dart';

class FindScreen extends StatefulWidget {
  @override
  _FindScreenState createState() => _FindScreenState();
}

class _FindScreenState extends State<FindScreen> {
  List<Company> list = [];

  @override
  void initState() {
    super.initState();
    getData();
  }

  getData() {
    setState(() {
      list = Company.resolveJson("""
          {
            "list": [
               {
                "logo": "https://img.bosszhipin.com/beijin/mcs/chatphoto/20161230/b0df9f099f1d6db1937bc78068fb4c15760bb3f59f760cd45f5945e615392f6f.jpg",
                "name": "杭州蚂蚁金服信息技术有限公司",
                "location": "上海市浦东新区",
                "type": "互联网",
                "size": "B轮",
                "employee": "10000人以上",
                "hot": "资深产品工程师",
                "count": "500",
                "inc": "蚂蚁金融服务集团（以下称“蚂蚁金服”）起步于2004年成立的支付宝。2014年10月，蚂蚁金服正式成立。蚂蚁金服以“为世界带来微小而美好的改变”为愿景，致力于打造开放的生态系统，通过“互联网推进器计划”助力金融机构和合作伙伴加速迈向“互联网+”，为小微企业和个人消费者提供普惠金融服务。蚂蚁金服集团旗下及相关业务包括生活服务平台支付宝、智慧理财平台蚂蚁聚宝、云计算服务平台蚂蚁金融云、独立第三方信用评价体系芝麻信用以及网商银行等。另外，蚂蚁金服也与投资控股的公司及关联公司一起，在业务和服务层面通力合作，深度整合共推商业生态系统的繁荣。"
              },
              {
                "logo": "https://img.bosszhipin.com/beijin/mcs/chatphoto/20170927/60158fe74a9233b55ee08206ca5df1dccfcd208495d565ef66e7dff9f98764da.jpg",
                "name": "百度",
                "location": "上海市浦东新区",
                "type": "互联网",
                "size": "已上市",
                "employee": "10000人以上",
                "hot": "Android架构师",
                "count": "300",
                "inc": "百度（纳斯达克：BIDU），全球最大的中文搜索引擎、最大的中文网站。1999年底,身在美国硅谷的李彦宏看到了中国互联网及中文搜索引擎服务的巨大发展潜力，抱着技术改变世界的梦想，他毅然辞掉硅谷的高薪工作，携搜索引擎专利技术，于 2000年1月1日在中关村创建了百度公司。“百度”二字,来自于八百年前南宋词人辛弃疾的一句词：众里寻他千百度。这句话描述了词人对理想的执着追求。"
              },
              {
                "logo": "https://img.bosszhipin.com/beijin/mcs/chatphoto/20170420/9e7ec542865511eb31273086b78598e355d0075cc85bc70bb61f658db0db4c2c.jpg",
                "name": "今日头条",
                "location": "北京朝阳区",
                "type": "互联网",
                "size": "D轮",
                "employee": "100-400人",
                "hot": "Android架构师",
                "count": "500",
                "inc": "【字节跳动】字节跳动成立于2012年3月，是一家技术驱动的移动互联网公司，公司致力于采用先进的推荐引擎技术，提供基于移动设备的信息分发解决方案。 "
              },
              {
                "logo": "https://img2.bosszhipin.com/mcs/chatphoto/20160317/5d308646e6e4bc4e68d5f97a74c14dcda2d41b7cc34321f537d83206460d4ca6.jpg",
                "name": "欧那教育",
                "location": "普陀区长寿路137号财富时代大厦6楼",
                "type": "互联网教育",
                "size": "A轮",
                "employee": "100-400人",
                "hot": "app技术经理",
                "count": "50",
                "inc": "随着中外交流的不断深入，需要越来越多掌握小语种的高端人才，也有越来越多的中国人选择到德国、法国、俄罗斯、西班牙等国家留学。但小语种教育资源在地域上分配很不平衡，许多小语种学习者在周边找不到优秀的小语种老师，许多小型小语种培训学校受限于资源也无力研发真正高质量的课程。上海云兜网络科技有限公司旗下欧那教育，是国内最早开始在线小语种培训机构，首创“真人在线实时教学”的互联网学习模式，通过最有效的沉浸式学习，打破传统的外语培训“知识堆积”的学习模式。全球数十位语言专家和教育专家组成的欧那教研团队研发的适合中国人学习的“极致·地道·匠心独具”的小语种语课程，帮助中国人用最快捷有效的方式，达成外语水平的提升。优质的中外籍师资、经济实惠的价格和全球专家研发的专业小语种课程赢得了数千位小语种学习者的认可和好评。我们相信互联网平等开放的力量，相信用优质的课程、实惠的价格、真诚的服务，让数百万对小语种学习和生活怀抱着热爱和执着，渴望通过努力改变生活改变未来的普通人，从见证小小改变的发生，到实现大大的梦想：）"
              },
              {
                "logo": "https://img.bosszhipin.com/beijin/mcs/chatphoto/20180120/feecd69f373a2a8b1189df93a0f6fd84cfcd208495d565ef66e7dff9f98764da.jpg",
                "name": "领健信息",
                "location": "上海市浦东新区",
                "type": "互联网",
                "size": "B轮",
                "employee": "500人以上",
                "hot": "前端工程师",
                "count": "100",
                "inc": "上海领健信息技术有限公司创立于2015年5月，2015年8月获得顶级投资机构经纬中国天使投资，2016年1月完成A轮融资，丁香园领投，天使投资人经纬中国继续跟进。"
              },
              {
                "logo": "https://img2.bosszhipin.com/mcs/chatphoto/20160220/6042752606dc6957d81c5f08f409db8e5e01c286644ac62b728b8918eb85ca28.jpg",
                "name": "平安银行",
                "location": "上海徐汇区平安大厦凯滨路206号",
                "type": "互联网",
                "size": "已上市",
                "employee": "10000人以上",
                "hot": "前端架构师",
                "count": "400",
                "inc": "平安银行，全称平安银行股份有限公司，是中国平安保险（集团）股份有限公司控股的一家跨区域经营的股份制商业银行，为中国大陆12家全国性股份制商业银行之一，总部位于广东省深圳市。中国平安保险（集团）股份有限公司（以下简称“中国平安”）及其控股子公司为平安银行的控股股东。"
              },
              {
                "logo": "https://www.lgstatic.com/thumbnail_160x160/i/image2/M00/2C/FA/CgoB5lowjbmAHxUGAAA2tROA4LA987.jpg",
                "name": "蘑菇租房",
                "location": "上海市静安区",
                "type": "互联网",
                "size": "C轮",
                "employee": "1000人以上",
                "hot": "IOS工程师",
                "count": "200",
                "inc": "蘑菇租房是国内领先的真实租房平台，2014年蘑菇租房从品牌长租公寓起步，蘑菇租房的前身蘑菇公寓致力于为都市白领创造高品质居住生活。"
              }
            ]
        }
      """);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('发现'),
        ),
        body: new Center(
            child: ListView.builder(
          itemCount: list.length,
          itemBuilder: (context, index) {
            var company = list[index];
            return CompanyItem(company);
          },
        )));
  }
}
/*
{
            "list": [
               {
                "logo": "https://img.bosszhipin.com/beijin/mcs/chatphoto/20161230/b0df9f099f1d6db1937bc78068fb4c15760bb3f59f760cd45f5945e615392f6f.jpg",
                "name": "杭州蚂蚁金服信息技术有限公司",
                "location": "上海市浦东新区",
                "type": "互联网",
                "size": "B轮",
                "employee": "10000人以上",
                "hot": "资深产品工程师",
                "count": "500",
                "inc": "蚂蚁金融服务集团（以下称“蚂蚁金服”）起步于2004年成立的支付宝。2014年10月，蚂蚁金服正式成立。蚂蚁金服以“为世界带来微小而美好的改变”为愿景，致力于打造开放的生态系统，通过“互联网推进器计划”助力金融机构和合作伙伴加速迈向“互联网+”，为小微企业和个人消费者提供普惠金融服务。蚂蚁金服集团旗下及相关业务包括生活服务平台支付宝、智慧理财平台蚂蚁聚宝、云计算服务平台蚂蚁金融云、独立第三方信用评价体系芝麻信用以及网商银行等。另外，蚂蚁金服也与投资控股的公司及关联公司一起，在业务和服务层面通力合作，深度整合共推商业生态系统的繁荣。"
              },
              {
                "logo": "https://img.bosszhipin.com/beijin/mcs/chatphoto/20170927/60158fe74a9233b55ee08206ca5df1dccfcd208495d565ef66e7dff9f98764da.jpg",
                "name": "百度",
                "location": "上海市浦东新区",
                "type": "互联网",
                "size": "已上市",
                "employee": "10000人以上",
                "hot": "Android架构师",
                "count": "300",
                "inc": "百度（纳斯达克：BIDU），全球最大的中文搜索引擎、最大的中文网站。1999年底,身在美国硅谷的李彦宏看到了中国互联网及中文搜索引擎服务的巨大发展潜力，抱着技术改变世界的梦想，他毅然辞掉硅谷的高薪工作，携搜索引擎专利技术，于 2000年1月1日在中关村创建了百度公司。“百度”二字,来自于八百年前南宋词人辛弃疾的一句词：众里寻他千百度。这句话描述了词人对理想的执着追求。"
              },
              {
                "logo": "https://img.bosszhipin.com/beijin/mcs/chatphoto/20170420/9e7ec542865511eb31273086b78598e355d0075cc85bc70bb61f658db0db4c2c.jpg",
                "name": "今日头条",
                "location": "北京朝阳区",
                "type": "互联网",
                "size": "D轮",
                "employee": "100-400人",
                "hot": "Android架构师",
                "count": "500",
                "inc": "【字节跳动】字节跳动成立于2012年3月，是一家技术驱动的移动互联网公司，公司致力于采用先进的推荐引擎技术，提供基于移动设备的信息分发解决方案。 "
              },
              {
                "logo": "https://img2.bosszhipin.com/mcs/chatphoto/20160317/5d308646e6e4bc4e68d5f97a74c14dcda2d41b7cc34321f537d83206460d4ca6.jpg",
                "name": "欧那教育",
                "location": "普陀区长寿路137号财富时代大厦6楼",
                "type": "互联网教育",
                "size": "A轮",
                "employee": "100-400人",
                "hot": "app技术经理",
                "count": "50",
                "inc": "随着中外交流的不断深入，需要越来越多掌握小语种的高端人才，也有越来越多的中国人选择到德国、法国、俄罗斯、西班牙等国家留学。但小语种教育资源在地域上分配很不平衡，许多小语种学习者在周边找不到优秀的小语种老师，许多小型小语种培训学校受限于资源也无力研发真正高质量的课程。上海云兜网络科技有限公司旗下欧那教育，是国内最早开始在线小语种培训机构，首创“真人在线实时教学”的互联网学习模式，通过最有效的沉浸式学习，打破传统的外语培训“知识堆积”的学习模式。全球数十位语言专家和教育专家组成的欧那教研团队研发的适合中国人学习的“极致·地道·匠心独具”的小语种语课程，帮助中国人用最快捷有效的方式，达成外语水平的提升。优质的中外籍师资、经济实惠的价格和全球专家研发的专业小语种课程赢得了数千位小语种学习者的认可和好评。我们相信互联网平等开放的力量，相信用优质的课程、实惠的价格、真诚的服务，让数百万对小语种学习和生活怀抱着热爱和执着，渴望通过努力改变生活改变未来的普通人，从见证小小改变的发生，到实现大大的梦想：）"
              },
              {
                "logo": "https://img.bosszhipin.com/beijin/mcs/chatphoto/20180120/feecd69f373a2a8b1189df93a0f6fd84cfcd208495d565ef66e7dff9f98764da.jpg",
                "name": "领健信息",
                "location": "上海市浦东新区",
                "type": "互联网",
                "size": "B轮",
                "employee": "500人以上",
                "hot": "前端工程师",
                "count": "100",
                "inc": "上海领健信息技术有限公司创立于2015年5月，2015年8月获得顶级投资机构经纬中国天使投资，2016年1月完成A轮融资，丁香园领投，天使投资人经纬中国继续跟进。"
              },
              {
                "logo": "https://img2.bosszhipin.com/mcs/chatphoto/20160220/6042752606dc6957d81c5f08f409db8e5e01c286644ac62b728b8918eb85ca28.jpg",
                "name": "平安银行",
                "location": "上海徐汇区平安大厦凯滨路206号",
                "type": "互联网",
                "size": "已上市",
                "employee": "10000人以上",
                "hot": "前端架构师",
                "count": "400",
                "inc": "平安银行，全称平安银行股份有限公司，是中国平安保险（集团）股份有限公司控股的一家跨区域经营的股份制商业银行，为中国大陆12家全国性股份制商业银行之一，总部位于广东省深圳市。中国平安保险（集团）股份有限公司（以下简称“中国平安”）及其控股子公司为平安银行的控股股东。"
              },
              {
                "logo": "https://www.lgstatic.com/thumbnail_160x160/i/image2/M00/2C/FA/CgoB5lowjbmAHxUGAAA2tROA4LA987.jpg",
                "name": "蘑菇租房",
                "location": "上海市静安区",
                "type": "互联网",
                "size": "C轮",
                "employee": "1000人以上",
                "hot": "IOS工程师",
                "count": "200",
                "inc": "蘑菇租房是国内领先的真实租房平台，2014年蘑菇租房从品牌长租公寓起步，蘑菇租房的前身蘑菇公寓致力于为都市白领创造高品质居住生活。"
              }
            ]
          }
*/
