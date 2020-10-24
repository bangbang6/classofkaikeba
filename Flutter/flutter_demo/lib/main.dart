import 'package:flutter/material.dart';





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
        onTap: onTabTapped,
        currentIndex: _currentIndex,
        selectedItemColor: Colors.red,
        type: BottomNavigationBarType.fixed,
       
        unselectedFontSize: 14.0,
        items: <BottomNavigationBarItem>[
          new BottomNavigationBarItem(
            icon: Icon(Icons.chat),
            label:'好友',
          ),
          new BottomNavigationBarItem(
            icon: Icon(Icons.navigation),
            label:'发现',
          ),
          new BottomNavigationBarItem(
            icon: Icon(Icons.folder_open),
            label:'管理'
          ),
          new BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label:'我的'
          ),
        ]
      ),
    );
  }
}
class FriendScreen extends StatelessWidget {
  const FriendScreen({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('好友'),
      ),
      body: new Center(
        child: Text('好友'), 
      ),
    );
  }
}

class FindScreen extends StatelessWidget {
  const FindScreen({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('发现'),
      ),
      body: new Center(
        child: Text('发现'), 
      ),
    );
  }
}

class ManagerScreen extends StatelessWidget {
  const ManagerScreen({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("管理"),
      ),
      body: new Center(
        child: Text(
          '管理',
          
        ), 
      ),
    );
  }
}
class MyScreen extends StatelessWidget {
  const MyScreen({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("我的"),
      ),
      body: new Center(
        child: Text(
          '我的',
          
        ), 
      ),
    );
  }
}
