import 'package:flutter/material.dart';

//当行多列就是listView
class ListViewTask extends StatelessWidget {
  List<String> items = List.generate(50, (index) => 'item $index');
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("listView 学习")),
      body: getListView2(),
    );
  }

  /*getListView1() {
    return ListView.builder(
      itemCount: items.length, //显示多少行 又几个胡数据就显示多少行
      itemBuilder: (context, index) {
        var content = items[index];
        return InkWell(
            child: Padding(
                padding: EdgeInsets.only(top: 20), child: Text(content)),
            onTap: () {
              print('aaa');
            });
      },
    );
  }*/
  //有分割线的
  getListView2() {
    return ListView.separated(
        itemCount: items.length,
        itemBuilder: (context, index) {
          var content = items[index];
          return InkWell(
              child: Padding(
                  padding: EdgeInsets.only(top: 20), child: Text(content)),
              onTap: () {
                print('aaa');
              });
        },
        separatorBuilder: (context, index) {
          return Divider(color: Colors.red);
        } //分割线配置
        );
  }
  //直接拼
  /*getListView3() {
    return ListView(
      children: <Widget>[Text('1'), Text('2')],
    );
  }*/
}
