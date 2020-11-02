import 'package:flutter/material.dart';
import 'package:flutter_demo/Borswer/BroswerScreen.dart';
import 'package:flutter_demo/work3/InheritedWidgetDemo.dart';

class TrendScreen extends StatelessWidget {
  const TrendScreen({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: new Text('动态'),
      ),
      body: Center(
          child: RaisedButton(
              child: Text('跳转'),
              onPressed: () {
                Navigator.of(context).push(new MaterialPageRoute(
                    builder: (context) => BroswerScreen()));
              })),
    );
  }
}
