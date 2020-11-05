import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_demo/FirstScreen.dart';

class WelComeScreen extends StatefulWidget {
  @override
  _WelComeScreenState createState() => _WelComeScreenState();
}

class _WelComeScreenState extends State<WelComeScreen> {
  int index = 5;
  Timer _timer;
  goHomePage() {
    Navigator.of(context).pushAndRemoveUntil(
        new MaterialPageRoute(builder: (context) => FirstScreen()),
        (route) => route == null);
  }

  @override
  void initState() {
    super.initState();
    _timer = new Timer.periodic(Duration(seconds: 1), (timer) {
      if (index == 1) {
        _timer.cancel();
        _timer = null;
        goHomePage();
      } else {
        setState(() {
          index = --index;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    double safetop = MediaQuery.of(context).padding.top;
    return Scaffold(
      body: Stack(
        children: <Widget>[
          Container(
              child: Image.asset('assets/images/welcome.jpg',
                  height: screenHeight, fit: BoxFit.cover)),
          Positioned(
              top: safetop,
              right: 20,
              child: Chip(
                label: Text('还有$index秒'),
                backgroundColor: Colors.transparent,
              ))
        ],
      ),
    );
  }
}
