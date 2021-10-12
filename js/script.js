

// ====================タイピング定義====================== //


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


// ========================ローディング画面処理:中央から左右へ動く========================== //
// ========================ローディング画面は、セッション間に一度のみ表示されるよう対応======== //


const keyName = 'visited';
const keyValue = true;

//初回アクセス時は、ローディングを表示
if (!sessionStorage.getItem(keyName)) {

  sessionStorage.setItem(keyName, keyValue); //sessionStorageにキーと値を追加

  //初回アクセス時の処理

  $(window).on('load', function () {

    $("#indexPage").addClass("loading-bkgcolor"); //ロード画面の背景色を灰色に

    $("#splash").css("display", "block");//ロゴを表示
    $("#splash-logo").delay(1200).fadeOut('slow');//ロゴを1.2秒でフェードアウト

    $('.topTxt>h1').css("animation-delay", "2s");//遅延時間変更
    $('.topTxt>h2').css("animation-delay", "3s");
    $('.topTxt>p').css("animation-delay", "4s");

    //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJS
    $("#splash").delay(1500).fadeOut('slow', function () {//ローディングエリアを1.5秒でフェードアウト

      $('body').addClass('appear');//フェードアウト後bodyにappearクラス付与
      // $("#indexPage").css("background", "#333");
    });
    //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJS

    //=====ここから背景が伸びた後に動かしたいJSをまとめる
    $('.splashbg1').on('animationend', function () {


      // ---------------タイピング処理------------------ //
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

  //2回目以降アクセス時の処理
} else {

  // ローディング画面を非表示にする
  $("#splash").css("display", "none"); //ローディング画面非表示
  $('.wrapper').css("opacity", "1"); //コンテンツを表示する
  $('.shadowBox').css("animation-delay", "0s");//遅延時間変更

  // ---------------タイピング処理------------------ //
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
}




// =============================スクロール時、h2文字回転処理============================== //


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
      $(this).removeClass("pink");//pinkというアニメーションクラスを除去
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




// =======================スクロール時、ふわっと表示する処理================================ //

// 動きのきっかけとなるアニメーションの名前を定義
function fadeAnime() {

  // ふわっ
  $('.fadeUpTrigger').each(function () { //fadeUpTriggerというクラス名が
    var elemPos = $(this).offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
    } else {
      $(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
    }
  });

}


// 画面をスクロールをしたら動かす
$(window).scroll(function () {
  fadeAnime();/* アニメーション用の関数を呼ぶ*/
});




//スクロールした際の動きを関数でまとめる
function PageTopAnime() {

  var scroll = $(window).scrollTop(); //スクロール値を取得
  if (scroll >= 300) {//500pxスクロールしたら
    $('#page-top').removeClass('DownMove');		// DownMoveというクラス名を除去して
    $('#page-top').addClass('UpMove');			// UpMoveというクラス名を追加して出現
  } else {//それ以外は
    if ($('#page-top').hasClass('UpMove')) {//UpMoveというクラス名が既に付与されていたら
      $('#page-top').removeClass('UpMove');	//  UpMoveというクラス名を除去し
      $('#page-top').addClass('DownMove');	// DownMoveというクラス名を追加して非表示
    }
  }

  var wH = window.innerHeight; //画面の高さを取得
  var footerPos = $('#footer').offset().top; //footerの位置を取得
  if (scroll + wH >= (footerPos + 10)) {
    var pos = (scroll + wH) - footerPos + 10 //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
    $('#page-top').css('bottom', pos);	//#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
  } else {//それ以外は
    if ($('#page-top').hasClass('UpMove')) {//UpMoveというクラス名がついていたら
      $('#page-top').css('bottom', '100px');// 下から10pxの位置にページリンクを指定
    }
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// // ページが読み込まれたらすぐに動かしたい場合の記述
// $(window).on('load', function () {
//   PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
// });

// #page-topをクリックした際の設定
$('#page-top').click(function () {
  $('body,html').animate({
    scrollTop: 0//ページトップまでスクロール
  }, 400);//ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false;//リンク自体の無効化
});

