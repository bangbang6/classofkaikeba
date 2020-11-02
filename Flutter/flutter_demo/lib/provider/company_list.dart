import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_demo/work1/Company.dart';
import 'package:http/http.dart' as http;

//!provider 所有的状态1变量
class CompanyListProvider with ChangeNotifier {
  List<Company> _companyList = new List();
  int _currentPage = 1;
  int _showValue = 0;

  List<Company> get companyList => _companyList;
  int get currentPage => _currentPage;
  int get showValue => _showValue;

  set companyList(List<Company> companyList) {
    _companyList = companyList;
    notifyListeners(); //通知界面刷新
  }

  int _type = 2;
  var url = 'http://m.app.haosou.com/index/getData?';
  //加载网络数据
  refrshData() async {
    var httpURL = url + 'type=$_type&page=1';
    var response = await http.get(httpURL);
    if (response.statusCode == 200) {
      var resultStr = response.body;
      var resultMap = json.decode(resultStr).cast<String, dynamic>();
      _companyList = Company.fromMapData(resultMap);
      _currentPage = 2;
      _showValue = 1;

      notifyListeners();

      return true;
    }
    return false;
  }

  //加载更多
  loadMoreData() async {
    var httpURL = url + 'type=$_type&page=$_currentPage';
    var response = await http.get(httpURL);
    if (response.statusCode == 200) {
      var resultStr = response.body;
      var resultMap = json.decode(resultStr).cast<String, dynamic>();
      _companyList.addAll(Company.fromMapData(resultMap));
      _currentPage++;

      notifyListeners();

      return true;
    }
    return false;
  }
}
