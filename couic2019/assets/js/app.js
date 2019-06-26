$(document).on('closed', '.remodal', function (e) {
    $('#video').attr('src','https://www.youtube.com/embed/C5GzagA5X44');
});
$(document).on('opening', '.remodal', function () {
    $('#video').attr('src','https://www.youtube.com/embed/C5GzagA5X44?autoplay=1');

});

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

preload([
    "https://heroku-adfinitas-campaign.s3.amazonaws.com/welfarm/couic2019/hover-bt-header.png",
    "https://heroku-adfinitas-campaign.s3.amazonaws.com/welfarm/couic2019/checked-not.png",
    "https://heroku-adfinitas-campaign.s3.amazonaws.com/welfarm/couic2019/checked.png",
    "https://heroku-adfinitas-campaign.s3.amazonaws.com/welfarm/couic2019/icon-heart-black.png"
]);



$('input[type=checkbox]').change(function() {
    if($(this).is(":checked")) {
        $(this).next().find("img").attr('src','https://heroku-adfinitas-campaign.s3.amazonaws.com/welfarm/couic2019/checked.png');
    }
    else {
        $(this).next().find("img").attr('src','https://heroku-adfinitas-campaign.s3.amazonaws.com/welfarm/couic2019/checked-not.png');
    }
});

$(window).scroll( function () {
    if ($(window).width() > 1010)
        checkAnimation()

});

$(document).ready( function () {
    $("#f_phone").intlTelInput({
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.13/js/utils.js",
        initialCountry: "fr"
    });

    if ($(window).width() > 1010)
        checkAnimation()

    $('input[name=f_email]').focus(function() {
        $('.container-form form .hidden').slideDown();
    });


    $('.accordeon .box').click( function () {

        if ($(this).find('.hidden').css('display') === 'block') {
            $(this).removeClass('active');
            $(this).find('.hidden').slideUp();
        }
        else {
            $(this).addClass('active');
            $(this).find('.hidden').slideDown();
        }

    });



    $('form').submit(function (e) {
        e.preventDefault();

        $('#body').slideUp();
        $('#merci').slideDown();
        $('.container-form').each(function () {
            $(this).slideUp();
        })
        $('.bt-don').addClass('yellow');
    })

});



function checkAnimation() {
    scrollTop = $(window).scrollTop();

    if (($('#body').offset().top / 1.1) < scrollTop) {
        animateContact(0);
    }
    else {
        animateContact(1);
    }

    if (($(".container-form.big").offset().top + $('.container-form.big').height()) - 5  > ($("#depuis").offset().top)) {
        animateContact(2);
    }
}


function animateContact(mode) {
    var popin = $('.container-form.big');

    if (mode === 0) {
        popin.css('top', "150px");
        popin.css('position','fixed')
    }
    else if (mode === 1) {
        popin.css('position','absolute');
        popin.css('top', "150px")
    }
    else if (mode === 2) {
        popin.css('position','absolute');
        popin.css('top', ($('#body').height() - (popin.height())) + 9)
    }
}

function 	scrollToNext(next){
    $('html, body').stop().animate({
        scrollTop: $(next).offset().top - 0
    }, 700, 'swing');
}

