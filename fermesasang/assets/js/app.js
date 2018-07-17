function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

// Usage:

preload([
    "https://s3.amazonaws.com/heroku-adfinitas-campaign/Welfarm-Ferme-a-sang/check-not.png",
    "https://s3.amazonaws.com/heroku-adfinitas-campaign/Welfarm-Ferme-a-sang/check.png"
]);

$('#box1, #box1 + label').click( function () {
    $('#box1').css('background-image','url("https://s3.amazonaws.com/heroku-adfinitas-campaign/Welfarm-Ferme-a-sang/check.png")')
    $('#box2').css('background-image','url("https://s3.amazonaws.com/heroku-adfinitas-campaign/Welfarm-Ferme-a-sang/check-not.png")')
    $('#f_female').attr('checked', "checked");
    $('#f_male').removeAttr('checked');
});
$('#box2, #box2 + label').click( function () {
    $('#box1').css('background-image','url("https://s3.amazonaws.com/heroku-adfinitas-campaign/Welfarm-Ferme-a-sang/check-not.png")')
    $('#box2').css('background-image','url("https://s3.amazonaws.com/heroku-adfinitas-campaign/Welfarm-Ferme-a-sang/check.png")')
    $('#f_female').removeAttr('checked');
    $('#f_male').attr('checked', "checked");
});


$(document).ready( function () {
    $("#f_phone").intlTelInput({
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.13/js/utils.js",
        initialCountry: "fr"
    });

    var CountRef = firebase.database().ref('count');

    CountRef.once('value', function(snapshot) {
        $('#nb-signatures').html(snapshot.val());
    });

    fillFieldsFromUrl();
});



    $('#yt-thumbnail').click( function (e) {
    e.preventDefault();
    $(this).hide();
    $('#video-container').show();


    autoPlayVideo();

});

function autoPlayVideo(){
    $("#video-container").html('<iframe id="yt-video" src="https://www.youtube.com/embed/e78FyME-mPg?rel=0&autoplay=1" frameborder="0"></iframe>');
}

function addVote() {
    var CountRef = firebase.database().ref('count');

    CountRef.once('value', function(snapshot) {
        $('#nb-signatures').html(snapshot.val() + 1);
        firebase.database().ref('count').set(snapshot.val() + 1);
    });

}


$('.scoring .score a').click( function () {
    sendDataBanniere($(this).attr('title'));
    $('.scoring').slideUp();
});

$('form').submit( function (e) {
    e.preventDefault();
    $('.error').hide();

    if ($(this).hasClass('validate')) {
        if (validateForm()) {
            $('#body').fadeOut(function () {
                $('#merci').fadeIn( function () {
                    $(document).scrollTop( $("header").offset().top + 1);
                });
            });
            addVote();
            sendData();
            $('.first-screen').fadeOut("slow", function () {
                $('.second-screen').fadeIn("slow", function () {
                    $('.scoring').slideDown();
                    if ($(window).width() > 640) {
                        $('.accroche').css('padding-top','240px');
                    }
                    else {
                        $('.accroche').css('padding-top','285px');

                    }
                });
            });
        }
    }
    else {
        if ($('#f_email').val() !== "") {
            if (!validateEmail($('#f_email').val())) {
                $('.error-mail-wrong').show();
                check = false;
            }
            else {
                $('.error-mail-wrong').hide();
                $(this).find('.hidden').slideDown();
                $(this).addClass('validate');
            }
        }
        else {
            $('.error-mail').show();
        }

    }


});


function validateForm() {
    var check = true;
    var selectedOption;
    if ($('#f_female').attr("checked") === "checked")
        selectedOption = "Madame";
    else if ($('#f_male').attr("checked") === "checked")
        selectedOption = "Monsieur";
    else
        selectedOption = "";

    $('.error').hide();

    if (selectedOption === "") {
        $('.error-civility').show();
        check = false;
    }

    if ($('#f_email').val() === "") {
        $('.error-mail').show();
        check = false;
    }
    if ($('#f_firstname').val() === "") {
        $('.error-firstname').show();
        check = false;
    }
    if ($('#f_lastname').val() === "") {
        $('.error-lastname').show();
        check = false;
    }

    if ($('#f_email').val() !== "") {
        if (!validateEmail($('#f_email').val())) {
            $('.error-mail-wrong').show();
            check = false;
        }
    }
    if ($('#f_phone').val() !== "") {
        if (!$("#f_phone").intlTelInput("isValidNumber")) {
            $('.error-phone-wrong').show();
            check = false;
        }
    }
    return check;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function fillFieldsFromUrl() {
    var p = extractUrlParams();

    if (p['email'] && p['email'] !== "undefined")
        $("#f_email").val(p['email']);
    if (p['firstname'] && p['firstname'] !== "undefined")
        $("#f_firstname").val(p['firstname']);
    if (p['lastname'] && p['lastname'] !== "undefined")
        $("#f_lastname").val(p['lastname']);
    if (p['phone'] && p['phone'] !== "undefined")
        $("#f_phone").val(p['phone']);
    if (p['wv_email'] && p['wv_email'] !== "undefined")
        $("#f_email").val(p['wv_email']);
    if (p['wv_firstname'] && p['wv_firstname'] !== "undefined")
        $("#f_firstname").val(p['wv_firstname']);
    if (p['wv_lastname'] && p['wv_lastname'] !== "undefined")
        $("#f_lastname").val(p['wv_lastname']);
    if (p['wv_phone'] && p['wv_phone'] !== "undefined")
        $("#f_phone").val(p['wv_phone']);
}

function extractUrlParams(){
    var t = document.location.search.substring(1).split('&'); var f = [];
    for (var i=0; i<t.length; i++){
        var x = t[ i ].split('=');
        f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
}