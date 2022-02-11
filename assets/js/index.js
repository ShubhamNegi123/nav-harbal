$(function(){
  

let productOfTheDayImg = $('.today-product-img .img1').attr('src');
$('.today-product-details .images img').mouseenter(function(){
    let hoverImg = $(this).attr('src');
    $('.today-product-img .img1').attr('src',hoverImg);
});





    $('.number').counterUp({
        delay: 10,
        time: 1000
    });

    $('.testimonial').owlCarousel({
        loop:true,
        margin:20,
        nav:false,
        dots: true,
        autoplay:false,
        autoplayTimeout:500,
        autoplayHoverPause:false,
        smartSpeed: 500,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:2
            },
            1300:{
                items:3
            }
        }
    });
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        dots: false,
        autoplay:true,
        autoplayTimeout:2500,
        autoplayHoverPause:false,
        smartSpeed: 2000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
    

    /* catogery dropdown */
    $('header .catogery').mouseenter(function(){
        $('.shop-by-catogery').slideDown();
    });     
    /* getting the position and sliding up dropdown */     
    var CurrentMouseXPostion;
    var CurrentMouseYPostion;    
    $(document).mousemove(function(event) {
        CurrentMouseXPostion = event.pageX;
        CurrentMouseYPostion = event.pageY;
        if(CurrentMouseYPostion < 100 || CurrentMouseYPostion > 900){
            $('.shop-by-catogery').slideUp();
        }
        //console.log(CurrentMouseYPostion)
    });
   
    
   
});