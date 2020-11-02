import 'package:flutter/material.dart';

//!状态管理
class InheritedWidgetDemo extends StatefulWidget {
  @override
  _InheritedWidgetDemoState createState() => _InheritedWidgetDemoState();
}

class _InheritedWidgetDemoState extends State<InheritedWidgetDemo> {
  int _count = 0;
  void _increaseCount() {
    setState(() {
      _count += 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    return CounterProvider(
        count: _count,
        increaseCount: _increaseCount,
        child: Scaffold(
          appBar: AppBar(title: Text('InheritedWidget')),
          body: MiddleCount(),
          floatingActionButton: FloatingActionButton(
            child: Icon(Icons.add),
            onPressed: _increaseCount,
          ),
        ));
  }
}

class MiddleCount extends StatelessWidget {
  int counter = 0;
  VoidCallback increaseCount;

  MiddleCount({Key key, this.counter, this.increaseCount}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: Counter(),
      ),
    );
  }
}

class Counter extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    int counter = CounterProvider.of(context).count;
    VoidCallback increaseCount = CounterProvider.of(context).increaseCount;
    return Center(
        child: GestureDetector(
      onTap: increaseCount,
      child: Text(
        '$counter',
        style: TextStyle(fontSize: 30),
      ),
    ));
  }
}

class CounterProvider extends InheritedWidget {
  final Widget child;
  final int count;
  final VoidCallback increaseCount;
  CounterProvider({this.child, this.count, this.increaseCount});
  //!of函数就是获取provider内部变量的
  static CounterProvider of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<CounterProvider>();
  }

  //!哪些变量变化要刷新控件 这里全部变化都刷新
  @override
  bool updateShouldNotify(CounterProvider oldWidget) {
    return true;
  }
}
