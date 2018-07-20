$(document).foundation();

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

preload([
    "https://s3.amazonaws.com/heroku-adfinitas-campaign/Welfarm-Ferme-a-sang/check-orange.png",
    "https://s3.amazonaws.com/heroku-adfinitas-campaign/Welfarm-Ferme-a-sang/check-not.png"
]);

$('#box1, #box1 + label').click( function () {
    $('#box1').css('background-image','url("https://s3.amazonaws.com/heroku-adfinitas-campaign/Welfarm-Ferme-a-sang/check-orange.png")')
    $('#box2').css('background-image','url("https://s3.amazonaws.com/heroku-adfinitas-campaign/Welfarm-Ferme-a-sang/check-not.png")')
    $('#f_female').attr('checked', "checked");
    $('#f_male').removeAttr('checked');
});
$('#box2, #box2 + label').click( function () {
    $('#box1').css('background-image','url("https://s3.amazonaws.com/heroku-adfinitas-campaign/Welfarm-Ferme-a-sang/check-not.png")')
    $('#box2').css('background-image','url("https://s3.amazonaws.com/heroku-adfinitas-campaign/Welfarm-Ferme-a-sang/check-orange.png")')
    $('#f_female').removeAttr('checked');
    $('#f_male').attr('checked', "checked");
});


$(document).ready( function () {
    $("#f_phone").intlTelInput({
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.13/js/utils.js",
        initialCountry: "fr"
    });



    fillFieldsFromUrl();
});


$('form').submit( function (e) {
    e.preventDefault();
    $('.error').hide();

    if (validateForm()) {
        $('#begin').fadeOut("slow", function () {
           $('#questionnaire').fadeIn();
        });
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



var index = 0;
var answer = [];

$('#questionnaire .container-answer a').click( function (e) {
    e.preventDefault();

    //RECORD SCORE
    answer.push($(this).attr('title'));

    index++;

    //CHECK END
    if (index === titleQuestions.length) {
        sendData(answer);
        $('#questionnaire').fadeOut("slow", function () {
           $('#merci').fadeIn();
        });
    }

    $('#title-question').fadeOut(); // REMOVE ELEMENT
    $('#nb-question').fadeOut(function () {

        $('#title-question').html(titleQuestions[index]); // CHANGE ELEMENT
        $('#nb-question').text(index + 1);

        $('#title-question').fadeIn(); // APPEAR ELEMENT
        $('#nb-question').fadeIn(function () {
        });
    });
}).hover(
    function() {
        $(this).css("background-color","#96c11f");
        $(this).css("border","2px solid #96c11f");
    }, function() {
        $(this).css("background-color","transparent");
        $(this).css("border","2px solid white");
    }
);