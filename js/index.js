
$(function(){
  let timer=null;
  let winWidth=$(window).width();
  $('.element-box').forEach((item,index) => {
    $(item).css({
      'left':winWidth/9*(index),
      'width':winWidth/9
    })
  });

  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    direction: 'vertical',
    loop:true,
    
    // initialSlide:5, //设置默认页
    on: {
      transitionEnd: function(){
        if (this.activeIndex==2){
          timer=setTimeout(()=>{
            $( '.list' ).makisu( 'open' );
          },4000)
        } else{
          $('.maki').removeClass('open')
          clearTimeout(timer);
        }
        
      },
      setTransition: function(){
        
        //去掉页面4个角图的animation
        let index=this.realIndex+1;
        // console.log(index);
        // console.log($('.page'+index));
        $('.page'+index).find('.page-huaLT').css('animation','1s ease .3s 1 normal both running fadeInLeft;');
        $('.page'+index).find('.page-huaRT').css('animation','1s ease .3s 1 normal both running fadeInRight')
        $('.page'+index).find('.page-huaBL').css('animation','1s ease .3s 1 normal both running fadeInUp')
        $('.page'+index).find('.page-huaBR').css('animation','1s ease .3s 1 normal both running fadeInUp')
      },
      slideChangeTransitionStart:function(){
        $('.pageHua').css('animation','');
      },
      
    
    },
  
  
  });
  
  if ( $.fn.makisu.enabled ) {
    var $maki = $( '.maki' );
    $maki.makisu({
        selector: 'dd',
        overlap: 0.6,
        speed: 0.85
    });
  } else {
    
  };
})




