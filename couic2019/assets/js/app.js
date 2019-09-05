$(document).on('closed', '.remodal.modal-video', function (e) {
    $('#video').attr('src','https://www.youtube.com/embed/y7BzRfLGLiw');
});
$(document).on('opening', '.remodal.modal-video', function () {
    $('#video').attr('src','https://www.youtube.com/embed/y7BzRfLGLiw?autoplay=1');
});

var database = firebase.database();

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

$('#signe-marques').click( function() {
    var inst = $('[data-remodal-id=marques]').remodal();
    inst.close();
    $('form').find('.hidden').slideDown('slow', function() {
        $('form').find('input').focus()
    })
})



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

$(window).resize( function () {
    if ($(window).width() > 640)
        $('.petition > div').css('width', $('#body').width());

});

$(document).ready( function () {
    $("input[name=f_phone]").each(function () {
        $(this).intlTelInput({
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.13/js/utils.js",
            initialCountry: "fr"
        });
    });


    var CountRef = database.ref('count');

    CountRef.once('value', function(snapshot) {
        $('.nb-sign').each(function () {
            $(this).html(snapshot.val());
        });
    });

    if ($(window).width() > 640)
        $('.petition >  div').css('width', $('#body').width());

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


    $('form').submit( function (e) {
        e.preventDefault();
        if (validateForm($(this))) {


            var optin = $(this).find('input[name=f_optin]');
            if (!optin.is(":checked")) {
                sendData($(this));
            }

            addVote();

            $('#body').slideUp();
            $('#merci').slideDown();
            $('.container-form').each(function () {
                $(this).slideUp();
            })
            $('.bt-don').addClass('yellow');
            scrollToNext($('body'));



        }
    });



    function validateForm(el) {
        var check = true;


        $('.error-mail-wrong').hide();
        $('.error-phone-wrong').hide();

        el.find('input').each( function() {
            $(this).removeClass('red-border');
        });

        var phone = el.find('input[name=f_phone]');
        var email = el.find('input[name=f_email]');


        if (phone.val() !== "") {
            if (!phone.intlTelInput("isValidNumber")) {
                $('.error-phone-wrong').show();
                phone.addClass('red-border');
                check = false;
            }
        }

        if (!validateEmail(email.val())) {
            $('.error-mail-wrong').show();
            email.addClass('red-border');
            check = false;
        }



        if (!check) {
            el.focus();
        }
        return check;
    }



    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $('#openPetition').click(function (e) {
        e.preventDefault();
        $('.petition').show();
    });
    $('#closePetition').click(function (e) {
        e.preventDefault();
        $('.petition').hide();
    });



    $('.marques .box').click( function () {
        var index = $(this).index() - 1
        var maxWidthCSS = [
            "440px",
            "370px",
            "215px",
            "725px",
            "380px",
        ]

        var i = 0;


        $('.marques .box').each( function () {
            if ($(this).index() - 1 !== index) {
                var _this = $(this)
                _this.find('.decorator').animate({
                    top: "0",
                }, 200, function() {
                    $(this).hide()
                });
                _this.find('.hidden').slideUp('slow', function () {
                    _this.removeClass('active')
                    _this.css('z-index','2')
                    _this.css('width',maxWidthCSS[i])

                })

            }
            i++
        });

        if ($(this).hasClass('active')) {
            var _this = $(this)
            _this.find('.decorator').animate({
                top: "0",
            }, 200, function() {
                $(this).hide()
            });
            _this.find('.hidden').slideUp('slow', function () {
                _this.removeClass('active')
                _this.css('z-index','2')
                _this.css('width',maxWidthCSS[index])

            })

        }
        else {
            if ($(window).width <= 640)
                $(this).addClass('active')
            $(this).css('z-index','9999')
            $(this).css('width','725px')

            $(this).addClass('active')
            $(this).find('.hidden').slideDown('slow', function () {

            })

            $(this).find('.decorator').fadeIn()
            $(this).find('.decorator').animate({
                top: "-27px",
            }, 200, function() {
            });

        }
    });

});

function addVote() {
    var CountRef = database.ref('count');

    CountRef.once('value', function(snapshot) {
        $('.nb-sign').each(function () {
            $(this).html(snapshot.val() + 1);
        });
        database.ref('count').set(snapshot.val() + 1);
    });

}

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

