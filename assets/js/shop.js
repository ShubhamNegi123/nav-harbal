$(function(){
    AOS.init();

    $('.home-section').owlCarousel({        
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplay: true,
        loop:true,
        items:1,
        margin:30,
        stagePadding:0,        
        smartSpeed:450         
    })

    $('.products .tab-wrapper .tab').click(function(){        
        $('.products .tab-wrapper .tab').removeClass('active-tab');
        $(this).addClass('active-tab');   
        $('.tab1').click(function(){
            $('.tab1-discription').show(500);
            $('.tab2-discription').hide(500);
            $('.tab3-discription').hide(500);
        });                    
        $('.tab2').click(function(){
            $('.tab2-discription').show(500);
            $('.tab1-discription').hide(500);
            $('.tab3-discription').hide(500);
        });                    
        $('.tab3').click(function(){
            $('.tab3-discription').show(500);
            $('.tab2-discription').hide(500);
            $('.tab-discription').hide(500);
        });                    
    });

});

