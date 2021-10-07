

// ==========タイピング定義========= //

// TextTypingというクラス名がついている子要素（span）を表示から非表示にする定義
function TextTypingAnime() {
  $('.TextTyping').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    var thisChild = "";
    if (scroll >= elemPos - windowHeight) {
      thisChild = $(this).children(); //spanタグを取得
      //spanタグの要素の１つ１つ処理を追加
      thisChild.each(function (i) {
        var time = 150;
        //時差で表示する為にdelayを指定しその時間後にfadeInで表示させる
        $(this).delay(time * i).fadeIn(time);
      });
    } else {
      thisChild = $(this).children();
      thisChild.each(function () {
        $(this).stop(); //delay処理を止める
        $(this).css("display", "none"); //spanタグ非表示
      });
    }
  });
}



// ==========中央から左右ローディング画面処理========= //

$(window).on('load', function () {
  $("#splash-logo").delay(1200).fadeOut('slow');//ロゴを1.2秒でフェードアウトする記述

  //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
  $("#splash").delay(1500).fadeOut('slow', function () {//ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述

    $('body').addClass('appear');//フェードアウト後bodyにappearクラス付与

  });
  //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる

  //=====ここから背景が伸びた後に動かしたいJSをまとめたい場合は
  $('.splashbg1').on('animationend', function () {
    //この中に動かしたいJSを記載

    // ==========タイピング処理========= //
    var element = $(".TextTyping");
    element.each(function () {
      var text = $(this).html();
      var textbox = "";
      text.split('').forEach(function (t) {
        if (t !== " ") {
          textbox += '<span>' + t + '</span>';
        } else {
          textbox += t;
        }
      });
      $(this).html(textbox);

    });
    TextTypingAnime();/* アニメーション用の関数を呼ぶ*/

  });
  //=====ここまで背景が伸びた後に動かしたいJSをまとめる

});






// ==========上から下ローディング画面処理========= //

// $(window).on('load', function () {
//   $("#splash-logo").delay(500).fadeOut('slow');//ロゴを1.2秒でフェードアウトする記述

//   //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
//   $("#splash").delay(500).fadeOut('slow', function () {//ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述

//     $('body').addClass('appear');//フェードアウト後bodyにappearクラス付与

//   });
//   //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる

//   //=====ここから背景が伸びた後に動かしたいJS
//   $('.splashbg').on('animationend', function () {
//     //この中に動かしたいJSを記載

//     // ==========タイピング処理========= //
//     var element = $(".TextTyping");
//     element.each(function () {
//       var text = $(this).html();
//       var textbox = "";
//       text.split('').forEach(function (t) {
//         if (t !== " ") {
//           textbox += '<span>' + t + '</span>';
//         } else {
//           textbox += t;
//         }
//       });
//       $(this).html(textbox);

//     });
//     TextTypingAnime();/* アニメーション用の関数を呼ぶ*/

//   });
//   //=====ここまで背景が伸びた後に動かしたいJS

// });






// ここから==========スクロール時、h2文字回転処理========= //


// rollAnimeにrollというクラス名を付ける定義
function RollAnimeControl() {
  $('.rollAnime').each(function () {
    var elemPos = $(this).offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    var childs = $(this).children();  //rollAnimeの子要素を取得
    if (scroll >= elemPos - windowHeight) {
      $(childs).each(function (i) {   //↓画面読み込み時にspanで分割された文字を一つずつ処理する

        if (i == 0) {    //1文字目のみピンク色にする
          $(this).addClass("pink");
        }

        if (i < 10) {         //10文字未満の場合
          $(this).css("transition-delay", "." + i + "s");  //子要素にcsstransition-delay:0.i sを追加
        } else {             //10文字以上の場合
          var n = i / 10;       //ミリ秒指定なので10で割る
          $(this).css("transition-delay", n + "s");  //子要素にcsstransition-delay:i sを追加
        }
      });

      $(this).addClass("roll"); //rollというアニメーションクラスを付与

    } else {
      $(childs).each(function () {    //子要素を1つ1つ処理をおこなう
        $(this).css("transition-delay", "0s");//子要素にcsstransition-delayの秒を0とする
      });
      $(this).removeClass("roll");//rollというアニメーションクラスを除去
      $(this).removeClass("pink");
    }
  });
}

// 画面スクロール時の処理
$(window).scroll(function () {
  RollAnimeControl();
});

// 画面が読み込み時の処理
$(window).on('load', function () {

  //spanタグを追加する
  var element = $(".rollAnime");
  element.each(function () {
    var text = $(this).text();
    var textbox = [];
    text.split('').forEach(function (t, i) {  //t=文字 i=何文字目かの数字
      if (t !== " ") {
        if (i < 10) {
          textbox += '<span>' + t + '</span>';
        } else {
          var n = i / 10;
          textbox += '<span>' + t + '</span>';
        }
      } else {
        textbox += t;
      }
    });
    $(this).html(textbox);
  });

  RollAnimeControl();/* アニメーション用の関数を呼ぶ*/
});


// ここまで==========スクロール時、h2文字回転========= //


// ここから==========ふわっと表示する処理========= //

// 動きのきっかけとなるアニメーションの名前を定義
function fadeAnime() {

  // ふわっ
  $('.fadeUpTrigger').each(function () { //fadeUpTriggerというクラス名が
    var elemPos = $(this).offset().top;//要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
    } else {
      $(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
    }
  });

}



// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  fadeAnime();/* アニメーション用の関数を呼ぶ*/
});

// ここまで==========ふわっと表示する処理========= //