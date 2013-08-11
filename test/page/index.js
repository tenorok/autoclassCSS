$(function() {

    $('.html-area').keyup(function () {
        $('.css-area').val(autoclasscss($(this).val()));
    });

});