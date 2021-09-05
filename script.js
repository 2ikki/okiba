$(function(){
    $('.card').children('img').click(function(){
        
    $(this).parent('.card').toggleClass('open');
    $(this).toggleClass('img_open');

    })
})