import 'package:flutter/material.dart';
import 'package:flutter_demo/Nav/FindScreenProvider.dart';
import 'package:flutter_demo/WelComeScreen.dart';
import 'package:flutter_demo/provider/company_list.dart';
import 'package:flutter_demo/work3/TrendScreen.dart';

import 'Nav/FindScreen.dart';
import 'Nav/FriendScreen.dart';
import 'Nav/ManagerScreen.dart';
import 'Nav/MyScreen.dart';
import 'package:provider/provider.dart';

void main() => runApp(MultiProvider(
    providers: [ChangeNotifierProvider(create: (_) => CompanyListProvider())],
    child: MyApp()));

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
      home: WelComeScreen(),
    );
  }
}
