import 'package:flutter/material.dart';
import 'package:flutter_demo/work1/Company.dart';
import 'package:flutter_demo/work3/company_hot_job.dart';
import 'package:flutter_demo/work3/company_inc.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../DotsIndicator.dart';
import 'Company_info.dart';

//!数据持久化 公司详情页
class SecondPage extends StatefulWidget {
  final Company _company;
  SecondPage(this._company);

  @override
  _SecondPageState createState() => _SecondPageState();
}

class _SecondPageState extends State<SecondPage> with TickerProviderStateMixin {
  List<Widget> _imagePages;
  List<Tab> _tabs;
  TabController tabController;
  VoidCallback onTapAction;
  int _currentIndex = 0;
  Widget companyTabContent;

  List<String> _urls = [
    'https://img.bosszhipin.com/beijin/mcs/chatphoto/20170725/861159df793857d6cb984b52db4d4c9c.jpg',
    'https://img2.bosszhipin.com/mcs/chatphoto/20151215/a79ac724c2da2a66575dab35384d2d75532b24d64bc38c29402b4a6629fcefd6_s.jpg',
    'https://img.bosszhipin.com/beijin/mcs/chatphoto/20180207/c15c2fc01c7407b98faf4002e682676b.jpg'
  ];
  @override
  initState() {
    super.initState();
    _imagePages = [];
    _urls.forEach((String url) {
      _imagePages.add(new Container(
          color: Colors.black,
          child: new ConstrainedBox(
            constraints: BoxConstraints.expand(),
            child: Image.network(url, height: 256.0, fit: BoxFit.cover),
          )));
    });
    _tabs = [new Tab(text: '公司概况'), Tab(text: '热招职位')];
    tabController = new TabController(length: _tabs.length, vsync: this);
    companyTabContent = CompanyInc(widget._company.inc);

    onTapAction = () {
      /* if (_currentIndex == 0) {
        companyTabContent = CompanyInc(widget._company.inc);
      } else {
        companyTabContent = CompanyHotJob();
      } */
      setState(() {
        _currentIndex = tabController.index;
      });
    };
    tabController.addListener(onTapAction);
    saveData();
    readData();
  }

  final Future<SharedPreferences> _preferences =
      SharedPreferences.getInstance();

  void saveData() async {
    final SharedPreferences pref = await _preferences;
    pref.setString("name", "bang");
  }

  readData() async {
    final SharedPreferences pref = await _preferences;
    String name = pref.getString('name');
  }

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).padding.top;
    return Scaffold(
      body: Stack(
        children: <Widget>[
          SingleChildScrollView(
            child: Column(children: <Widget>[
              SizedBox.fromSize(
                  size: Size.fromHeight(256.0),
                  child: IndicatorViewPager(pages: _imagePages)),
              Container(
                  color: Colors.white,
                  child: Column(
                    children: <Widget>[
                      CompanyInfo(widget._company),
                      Divider(),
                      new TabBar(
                          tabs: _tabs,
                          controller: tabController,
                          labelColor: Colors.black,
                          labelStyle: TextStyle(fontSize: 16.0),
                          indicatorSize: TabBarIndicatorSize.tab,
                          indicatorWeight: 3.0,
                          indicatorColor: Colors.pink),
                    ],
                  )),
              IndexedStack(index: _currentIndex, children: <Widget>[
                CompanyInc(widget._company.inc),
                CompanyHotJob()
              ])
            ]),
          ),
          new Positioned(
            top: screenHeight,
            child: BackButton(color: Colors.white),
            left: 10,
          )
        ],
      ),
    );
  }
}
