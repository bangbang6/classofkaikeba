import 'package:flutter/material.dart';

import 'Nav/FindScreen.dart';
import 'Nav/FriendScreen.dart';
import 'Nav/ManagerScreen.dart';
import 'Nav/MyScreen.dart';

void main() => runApp(MyApp());

//暗号:初见Flutter
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: FirstScreen(),
    );
  }
}

class FirstScreen extends StatefulWidget {
  FirstScreen({Key key}) : super(key: key);

  @override
  _FirstScreenState createState() => _FirstScreenState();
}

class _FirstScreenState extends State<FirstScreen> {
  final List<Widget> _children = [
    FriendScreen(),
    FindScreen(),
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
