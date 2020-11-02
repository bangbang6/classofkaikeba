import 'package:flutter/material.dart';

class CompanyHotJob extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    
    return new Padding(
      padding: const EdgeInsets.only(
        top: 10.0,
        left: 10.0,
        right: 10.0,
        bottom: 10.0
      ),
      child: new Row(
        children: <Widget>[
          // RichText(
          //   text: new TextSpan(
          //     text: '敬请期待',
          //     style: TextStyle(
          //       fontSize: 16.0,
          //       color: Colors.black
          //     )
          //   ),
          // )
          RichText(
            text: new TextSpan(
              children: <TextSpan>[
                TextSpan(
                   text: '敬请期待',
                    style: TextStyle(
                    fontSize: 16.0,
                    color: Colors.black)
                ),
                TextSpan(
                   text: '敬请期待',
                    style: TextStyle(
                    fontSize: 26.0,
                    color: Colors.black)
                ),
                TextSpan(
                   text: '敬请期待',
                    style: TextStyle(
                    fontSize: 16.0,
                    color: Colors.red)
                ),
              ]
            ),
          )
        ],
      ),
    );
  }
}