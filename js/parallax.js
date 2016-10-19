$(function(){

  
  var $window         = $(window);
  var $anim_elements  = $('.parallax');


  function check_if_view(){
    var window_top    = $window.scrollTop();
    var window_height = $window.outerHeight();
    var window_bottom = window_top + window_height;
    $.each($anim_elements, function(){

      //animáció hozzáadása a megjelenítendő elemhez
      var $anim_el = $($(this).find('h1')[0]);
      var anim_el_top = $anim_el.position().top;
      var anim_el_height = $anim_el.outerHeight();
      var anim_el_bottom = anim_el_top + anim_el_height;

      //Itt vagyunk, amikor az adott parallax elem látható lesz
      if(window_bottom >= anim_el_top && anim_el_bottom >= window_top){

        //Hozzáadjuk az osztályt az animálandó elemhez, ami 0-ra állítja a bal margint
        //css transition miatt lesz animált
        $anim_el.addClass('zeroLeftMargin');

        //--Parallax varázslat--
        //Ahhoz, hogy fotó is lehessen a parallaxos háttér, kell a parallax elem magassága.
        //A parallax háttérkép eredeti magassága. 
        //(a háttérnek az eredeti kép mérete szerint kell megjelennie a weblapon)
        //A parallax elem magassága - a kép magassága = a kép y kezdő koordinátája
        //Kell még egy szorzószám, ami a képernyő aktuális helyzetéhez igazítja
        //a háttérképet scrollozás közben (amikor a parallax elem megjelenik, 
        //a háttérnek az elem alján kell lennie, amikor eltűnik, akkor az elem tetején)
        var $para_el = $(this);
        var para_el_top = $para_el.offset().top;
        var para_el_height = $para_el.innerHeight();
        var para_el_bottom = para_el_top + para_el_height;
        var screenX = $window.scrollTop();
        var bgYPos = (screenX - para_el_bottom) / (window_height + para_el_height);
        bgYPos = 1 - Math.abs(bgYPos);
        var bg_image_url = $para_el.css('background-image');
        var bg_image_regex = /"([^"]*)"/;
        var img_url = bg_image_regex.exec(bg_image_url)[1];
        var img = new Image;
        img.src = img_url
        var img_height = img.height;
        $para_el.css('background-position', '50% '+(para_el_height - img_height)*bgYPos+'px');
      }else{
        $anim_el.removeClass('zeroLeftMargin');
      }
    });
  }
  $window.on('scroll', check_if_view);
});