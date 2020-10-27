import 'package:flutter/material.dart';

class FriendScreen extends StatelessWidget {
  const FriendScreen({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('好友'),
        ),
        body: SafeArea(
          child: Text('好友'),
        ));
  }
}
