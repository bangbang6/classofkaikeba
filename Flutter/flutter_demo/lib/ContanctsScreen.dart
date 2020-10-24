import 'package:flutter/material.dart';

class ContanctsScreen extends StatelessWidget {
  const ContanctsScreen({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('联系人'),
      ),
      body: new Center(
        child: new Column(
           children: <Widget>[
             Image.asset(
               'assets/images/owl.jpg',
               width: 100, height: 100,
             ),
             Image.network(
               'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3457343279,3072766965&fm=26&gp=0.jpg',
               width: 100, height: 100,
              //  fit: BoxFit.cover,
             )
           ],
        ), 
      ),
    );
  }
}