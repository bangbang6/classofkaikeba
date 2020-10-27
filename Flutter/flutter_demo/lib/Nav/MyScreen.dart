import 'package:flutter/material.dart';

class MyScreen extends StatelessWidget {
  const MyScreen({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        //头部标签栏
        title: Text("我的"),
      ),
      body: new Center(
          child: Container(
              width: 100,
              height: 100,
              color: Colors.red,
              child: Text(
                '我的我的我的我的我的我顶我顶我顶我顶我顶我',
                overflow: TextOverflow.ellipsis,
                maxLines: 2,
              ))),
    );
  }
}
