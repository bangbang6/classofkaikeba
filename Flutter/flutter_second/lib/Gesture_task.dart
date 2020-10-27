import 'package:flutter/material.dart';

//!要什么功能就外面封装一层控件
class GestureTask extends StatelessWidget {
  const GestureTask({Key key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: new AppBar(title: Text("手势课学习")),
        body: Container(
          color: Colors.red,
          child: new Center(
              child: GestureDetector(
            onTap: () {
              print('AAA');
            },
            child: new Text('here is a txt'),
          )),
          //constraints: BoxConstraints.expand(),
        ));
  }
}
