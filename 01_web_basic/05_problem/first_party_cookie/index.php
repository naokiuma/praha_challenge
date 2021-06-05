<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>first partyのクッキーです</title>
</head>
<body>
    <h1>first partyの表示ページです！</h1>
    <?php 
        setcookie("first","party-cookie",0,"/","first.com",false,true);
        //php7.3以降はoption指定も可能
        //setcookie ( string $name , string $value = "" , array $options = [] ) : bool
        //https://qiita.com/tadsan/items/96db7894e285743d996b
     ?>
     <h3>このページはphpで作成されています</h3>
     <img src="./sample-cookie.png" alt="">
     <h3>この画像はサードパーティのクッキーです。expressサーバー上の画像を読み込んでます。</h3>
     
     <!--ngrokで払い出されるurlをリンク先に設定（urlは毎回異なる）-->
     <iframe id="inline-frame" width="500px" height="300px" src="http://106ca1374da8.ngrok.io"></iframe>     
</body>
</html>