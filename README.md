概要
dockerにて、MySQL、phpMyAdmin、node.jsアプリを定義しています。
MySQLで定義しているテーブルのタイムスタンプについては、
桁の問題によりbigintで定義してあります。

操作
1. docker-composeでupさせる。
2. localhost:3000にアクセスする。
3. textboxにディレクトリパスを入力し、ボタンを押下するとDBへレコードが挿入される。

定義
API →　"/fileRator"
node -v →　v8.17.0
npm -v  →　6.13.4
