/* activate scrollspy menu */
$('body').scrollspy({
  target: '#navbar-collapsible',
  offset: 52
});

/* smooth scrolling sections */
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, 800);

        if (this.hash=="#section1") {
            $('.scroll-up').hide();
        }
        else {
            $('.scroll-up').show();
        }


        // activte animations in this section
        target.find('.animate').delay(1200).addClass("animated");
        setTimeout(function(){
            target.find('.animated').removeClass("animated");
        },2000);

        return false;
      }
    }
});

$('.aboutInside#demo') 
  .mouseenter(function() {

    $('img.aboutImg#demo').hide(100);
    $('h2#demo').hide(100);
    $('p.hiddenText#demo').css('display', 'block');
    // $('.aboutInside#demo').addClass('hvr-outline-in');
  })

  .mouseleave(function () {
    $('img.aboutImg#demo').show(100);
    $('h2#demo').show(100);
    $('p.hiddenText#demo').css('display', 'none');

  });

$('.aboutInside#market') 
  .mouseenter(function() {

    $('img.aboutImg#market').hide(100);
    $('h2#market').hide(100);
    $('p.hiddenText#market').css('display', 'block');
    // $('.aboutInside#demo').addClass('hvr-outline-in');
  })

  .mouseleave(function () {
    $('img.aboutImg#market').show(100);
    $('h2#market').show(100);
    $('p.hiddenText#market').css('display', 'none');

  });

  $('.aboutInside#land') 
  .mouseenter(function() {

    $('img.aboutImg#land').hide(100);
    $('h2#land').hide(100);
    $('p.hiddenText#land').css('display', 'block');
    // $('.aboutInside#demo').addClass('hvr-outline-in');
  })

  .mouseleave(function () {
    $('img.aboutImg#land').show(100);
    $('h2#land').show(100);
    $('p.hiddenText#land').css('display', 'none');

  });

  $('.aboutInside#culture') 
  .mouseenter(function() {

    $('img.aboutImg#culture').hide(100);
    $('h2#culture').hide(100);
    $('p.hiddenText#culture').css('display', 'block');
    // $('.aboutInside#demo').addClass('hvr-outline-in');
  })

  .mouseleave(function () {
    $('img.aboutImg#culture').show(100);
    $('h2#culture').show(100);
    $('p.hiddenText#culture').css('display', 'none');

  });
