import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class BroswerScreen extends StatelessWidget {
  WebViewController _webViewController;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('网页')),
        body: WebView(
          initialUrl: "https://flutterchina.club/",
          // javascriptChannels: , //内嵌js代码
          javascriptMode: JavascriptMode.unrestricted, //是否执行js
          onWebViewCreated: (controller) {
            _webViewController = controller; //控制器
          }, //网页加载成功
          onPageStarted: (url) {
            //url网页链接
            //界面开始加载
          },
        ));
  }
}
