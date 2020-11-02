import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_demo/Nav/SecondPage.dart';
import 'package:flutter_demo/provider/company_list.dart';
import 'package:flutter_demo/work1/CompanyItem.dart';

import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';

//!暗号:"江湖再见"
class FindScreenProvider extends StatefulWidget {
  FindScreenProvider({Key key}) : super(key: key);

  @override
  _FindScreenProviderState createState() => _FindScreenProviderState();
}

class _FindScreenProviderState extends State<FindScreenProvider> {
  RefreshController _refreshController =
      RefreshController(initialRefresh: false);

  @override
  void initState() {
    super.initState();

    //listen的含义
    CompanyListProvider provider =
        Provider.of<CompanyListProvider>(context, listen: false);
    provider.refrshData();
  }

  Widget _buildContent() {
    return Consumer<CompanyListProvider>(builder: (context, provider, _) {
      return IndexedStack(
        index: provider.showValue,
        children: <Widget>[
          Center(
            child: CircularProgressIndicator(),
          ),
          SmartRefresher(
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
              idleText: '加载更多数据',
              loadingText: '玩命加载中...',
              noDataText: '没有更多数据',
              // noMoreIcon: Icon(Icons.account_balance_wallet),
            ),
            onRefresh: _onRefresh,
            onLoading: _onLoading,
            child: ListView.builder(
              itemBuilder: (context, index) {
                var model = provider.companyList[index];
                return InkWell(
                  child: CompanyItem(model),
                  onTap: () {
                    Navigator.of(context).push(new MaterialPageRoute(
                        builder: (context) => SecondPage(model)));
                  },
                );
              },
              itemCount: provider.companyList.length,
            ),
          )
        ],
      );
    });
  }

  void _onRefresh() async {
    CompanyListProvider provider =
        Provider.of<CompanyListProvider>(context, listen: false);
    bool isSuccess = await provider.refrshData();
    if (isSuccess) {
      _refreshController.refreshCompleted();
    } else {
      _refreshController.refreshFailed();
    }
  }

  void _onLoading() async {
    CompanyListProvider provider =
        Provider.of<CompanyListProvider>(context, listen: false);
    bool isSuccess = await provider.loadMoreData();
    if (isSuccess) {
      _refreshController.loadComplete();
    } else {
      _refreshController.loadFailed();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: new Text('发现'),
        ),
        body: _buildContent());
  }
}
