import 'package:flutter/material.dart';
import 'package:flutter_demo/work1/Company.dart';
//!暗号：不用背,学规律

class CompanyItem extends StatelessWidget {
  final Company company;
  CompanyItem(this.company);
  @override
  Widget build(BuildContext context) {
    return Container(
        height: 160,
        padding: EdgeInsets.all(5),
        child: Card(
            elevation: 10,
            child: Column(children: <Widget>[
              Row(
                children: <Widget>[
                  Container(
                      width: 70,
                      height: 70,
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          image: DecorationImage(
                              image: NetworkImage(company.logo),
                              fit: BoxFit.cover))),
                  SizedBox(width: 20),
                  Container(
                    width: 100,
                    height: 80,
                    child: Center(
                      child: Text(company.location,
                          overflow: TextOverflow.ellipsis),
                    ),
                  ),
                  SizedBox(width: 20),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text("|" + company.type),
                      Text("|" + company.size),
                      Text("|" + company.employee),
                    ],
                  )
                ],
              ),
              Divider(color: Colors.grey),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Container(
                      padding: EdgeInsets.all(10),
                      child: Row(children: <Widget>[
                        Text('热招:'),
                        SizedBox(width: 10),
                        Text(company.hot),
                        SizedBox(width: 10),
                        Text('等' + company.count + '个职位')
                      ])),
                  Container(
                    padding: EdgeInsets.fromLTRB(0, 0, 20, 0),
                    child: Text('>', style: TextStyle(fontSize: 20)),
                  )
                ],
              )
            ])));
  }
}
/*{
                "logo": "https://img.bosszhipin.com/beijin/mcs/chatphoto/20161230/b0df9f099f1d6db1937bc78068fb4c15760bb3f59f760cd45f5945e615392f6f.jpg",
                "name": "杭州蚂蚁金服信息技术有限公司",
                "location": "上海市浦东新区",
                "type": "互联网",
                "size": "B轮",
                "employee": "10000人以上",
                "hot": "资深产品工程师",
                "count": "500",
                "inc": "蚂蚁金融服务集团（以下称“蚂蚁金服”）起步于2004年成立的支付宝。2014年10月，蚂蚁金服正式成立。蚂蚁金服以“为世界带来微小而美好的改变”为愿景，致力于打造开放的生态系统，通过“互联网推进器计划”助力金融机构和合作伙伴加速迈向“互联网+”，为小微企业和个人消费者提供普惠金融服务。蚂蚁金服集团旗下及相关业务包括生活服务平台支付宝、智慧理财平台蚂蚁聚宝、云计算服务平台蚂蚁金融云、独立第三方信用评价体系芝麻信用以及网商银行等。另外，蚂蚁金服也与投资控股的公司及关联公司一起，在业务和服务层面通力合作，深度整合共推商业生态系统的繁荣。"
              },*/
