import 'dart:convert';

class Article {
  final String articleTitle;
  final String articlePic;
  final String userName;
  final String count;
  Article({this.articlePic, this.articleTitle, this.userName, this.count});

  static List<Article> resolveJson(String listJson) {
    List<Article> listModel = new List<Article>();
    List list = jsonDecode(listJson)['list'];
    list.forEach((article) {
      var model = new Article(
        articleTitle: article['articleTitle'],
        articlePic: article['articlePic'],
        userName: article['userName'],
        count: article['count'],
      );
      listModel.add(model);
    });
    return listModel;
  }
}
