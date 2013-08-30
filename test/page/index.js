$(function() {

    $('.area_type_html').keyup(function () {
        $('.area_type_css').val(new Autoclasscss($(this).val()).get());
    });

});