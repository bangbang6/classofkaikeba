//数据量比较少
import 'package:flutter/material.dart';

class SingeleChildScrollViewTask extends StatelessWidget {
  List<String> items = List.generate(50, (index) => 'item $index');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('single学习')),
        body: SingleChildScrollView(
            child: Column(
          children: items
              .map((item) => Text(item, style: TextStyle(fontSize: 20)))
              .toList(),
        )));
  }
}
