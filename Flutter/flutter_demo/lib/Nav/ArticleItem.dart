import 'package:flutter/material.dart';
import 'package:flutter_demo/Nav/Article.dart';

class ArticleItem extends StatelessWidget {
  final Article model;
  ArticleItem(this.model);
  @override
  Widget build(BuildContext context) {
    return Container(
        height: 100,
        padding: EdgeInsets.all(5),
        child: Card(
          elevation: 10,
          child: Padding(
              child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    new Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Text(model.articleTitle,
                            style:
                                TextStyle(fontSize: 18, color: Colors.black)),
                        Row(children: <Widget>[
                          Text(model.userName,
                              style:
                                  TextStyle(fontSize: 14, color: Colors.black)),
                          SizedBox(width: 10),
                          Icon(Icons.local_florist,
                              size: 20, color: Colors.grey),
                          Text(
                            model.count,
                            style: TextStyle(fontSize: 18, color: Colors.grey),
                          )
                        ])
                      ],
                    ),
                    Container(
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10),
                            image: DecorationImage(
                                image: NetworkImage(model.articlePic),
                                fit: BoxFit.cover)))
                  ]),
              padding: EdgeInsets.all(5)),
        ));
  }
}
