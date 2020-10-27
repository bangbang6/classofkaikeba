import 'package:flutter/material.dart';

//多行多列
class GridViewTask extends StatelessWidget {
  List<String> items = List.generate(50, (index) => 'item $index');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('girdView学习'),
        ),
        body: getGridView3());
  }

  getGridView1() {
    return GridView.count(
        crossAxisCount: 2, //横向有几个
        crossAxisSpacing: 10, //横向间距
        mainAxisSpacing: 10, //纵向间距
        children: items.map((item) => getItemContainer(item)).toList()); //自己拼接
  }

  getGridView2() {
    return GridView.builder(
      itemCount: items.length,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          crossAxisSpacing: 10, //横向间距
          mainAxisSpacing: 10), //纵向间距

      itemBuilder: (context, index) {
        return getItemContainer(items[index]); //不用自己拼接
      },
    );
  }

  getGridView3() {
    return GridView.builder(
      itemCount: items.length,
      gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
          maxCrossAxisExtent: 200,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10), //一个方块最大的宽度 根据屏幕宽度和间隙自动计算能放几个快
      itemBuilder: (context, index) {
        return getItemContainer(items[index]);
      },
    );
  }

  Widget getItemContainer(String item) {
    return Container(
      alignment: Alignment.center,
      color: Colors.blue,
      child: Text(item, style: TextStyle(fontSize: 20, color: Colors.white)),
    );
  }
}
