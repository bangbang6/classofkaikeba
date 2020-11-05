import 'package:flutter/material.dart';
import 'package:flutter_demo/Nav/FindScreenProvider.dart';
import 'package:flutter_demo/Nav/FriendScreen.dart';
import 'package:flutter_demo/Nav/ManagerScreen.dart';
import 'package:flutter_demo/Nav/MyScreen.dart';

class FirstScreen extends StatefulWidget {
  FirstScreen({Key key}) : super(key: key);

  @override
  _FirstScreenState createState() => _FirstScreenState();
}

class _FirstScreenState extends State<FirstScreen> {
  final List<Widget> _children = [
    FriendScreen(),
    FindScreenProvider(),
    ManagerScreen(),
    MyScreen()
  ];

  int _currentIndex = 0;

  void onTabTapped(int selectIndex) {
    setState(() {
      _currentIndex = selectIndex;
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      body: _children[_currentIndex],
      drawer: new Drawer(
        child: Center(
          child: Text('Drawer'),
        ),
      ),
      bottomNavigationBar: new BottomNavigationBar(
          //底部导航栏
          onTap: onTabTapped,
          currentIndex: _currentIndex,
          selectedItemColor: Colors.red,
          type: BottomNavigationBarType.fixed,
          unselectedFontSize: 14.0,
          items: <BottomNavigationBarItem>[
            new BottomNavigationBarItem(
              icon: Icon(Icons.chat),
              label: '好友',
            ),
            new BottomNavigationBarItem(
              icon: Icon(Icons.navigation),
              label: '发现',
            ),
            new BottomNavigationBarItem(
                icon: Icon(Icons.folder_open), label: '管理'),
            new BottomNavigationBarItem(icon: Icon(Icons.person), label: '我的'),
          ]),
    );
  }
}
