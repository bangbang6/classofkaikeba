import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_demo/work1/Company.dart';
import 'package:flutter_demo/work1/CompanyItem.dart';

import 'package:http/http.dart' as http;
import 'package:pull_to_refresh/pull_to_refresh.dart';

import 'SecondPage.dart';

//!暗号：原来好可以这么玩
class MyScreen extends StatefulWidget {
  MyScreen({Key key}) : super(key: key);

  @override
  _MyScreenState createState() => _MyScreenState();
}

class _MyScreenState extends State<MyScreen> {
  List<Company> _companies = [];
  int page = 1;
  RefreshController _refreshController =
      RefreshController(initialRefresh: false);

  @override
  void initState() {
    super.initState();

    /*  //listen的含义
    CompanyListProvider provider = Provider.of<CompanyListProvider>(context, listen: false); //拿到provider
    provider.refrshData();*/ //执行provider里面定义的函数
    getCompanyList2();
  }

  getCompanyList2() async {
    String url = 'http://m.app.haosou.com/index/getData?type=1&page=$page';
    var response = await http.get(url);
    var data = response.body;
    var json = jsonDecode(data);
    setState(() {
      _companies = Company.fromMapData(json);
    });
  }

  Widget _buildContent() {
    //套用consumer来使用provider 参数的provider就是定义的provider 可以获取参数或者执行内部定义的函数
    //!可以有两种形式获取provider 1.  CompanyListProvider provider = Provider.of<CompanyListProvider>(context, listen: false); 2.  return Consumer<CompanyListProvider>(
    //!第一种是用来显示数据的和组件相关 第二个是用来执行函数改变内部数据的 分工不同 具体用法看findProvideer.dart文件
/*
     return Consumer<CompanyListProvider>(
      builder: (context, provider, _) {
      return IndexedStack(
        index: provider.showValue,
        children: <Widget>[*/
    if (_companies.isEmpty) {
      return new Center(
        child: CircularProgressIndicator(),
      );
    }

    return SmartRefresher(
      controller: _refreshController,
      enablePullDown: true,
      enablePullUp: true,
      header: ClassicHeader(
          refreshingText: '正在加载中...',
          idleText: '下拉刷新',
          completeText: '加载完成',
          failedText: '数据刷新异常',
          releaseText: '松开刷新'),
      footer: ClassicFooter(
          idleText: '加载更多数据', loadingText: '玩命加载中...', noDataText: '没有更多数据'),
      onRefresh: _onRefresh,
      onLoading: _onLoading,
      child: ListView.builder(
        itemBuilder: (context, index) {
          var model = _companies[index];
          return InkWell(
            child: CompanyItem(model),
            onTap: () {
              Navigator.push(
                  context,
                  new MaterialPageRoute(
                      builder: (context) => new SecondPage(model)));
            },
          );
        },
        itemCount: _companies.length,
      ),
    );
  }

  void _onRefresh() async {
    String url = 'http://m.app.haosou.com/index/getData?type=1&page=1';
    var response = await http.get(url);
    var data = response.body;
    var json = jsonDecode(data);
    setState(() {
      _companies = Company.fromMapData(json);
      _refreshController.refreshCompleted();
    });
  }

  void _onLoading() async {
    setState(() {
      page = ++page;
    });
    print(page);
    String url = 'http://m.app.haosou.com/index/getData?type=1&page=$page';
    var response = await http.get(url);
    var data = response.body;
    var json = jsonDecode(data);
    _companies.addAll(Company.fromMapData(json));
    setState(() {
      _companies = _companies;
      _refreshController.loadComplete();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: new Text('我的'),
        ),
        body: _buildContent());
  }
}
