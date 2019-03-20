

var database = firebase.database();

$(document).ready( function () {
    fillFieldsFromUrl();

    var CountRef = database.ref('count');

    CountRef.once('value', function(snapshot) {
        $('#nb-sign').html(displayNumber(snapshot.val()));
        let gauge = new Gauge(document.getElementById('gauge')).setOptions(opts);
        setGauge(gauge, snapshot.val());
    });
});

$('#form').submit(function(e) {
    e.preventDefault();
    if (validateForm()) {
        addVote();
        if(!$('#f_optin').is(':checked')) {
            sendData();
        }


        $('#form').fadeOut('slow');
        $('#petition-bt-small').hide();
        $('.header .text').css('margin-top', '20px')

        $('.header h1').fadeOut('slow', function () {
            $('.header h1').html('MERCI<br />D’AVOIR SIGNÉ<br />LA PÉTITION');
            $('.header .text').css('padding','12px');
            $('.header h1').fadeIn('slow', function () {
                $('.gauge-container').css({'margin-top':'150px','margin-bottom':'100px'});
                $('.header .share').fadeIn();
                $('#merci').css('visibility', 'visible').hide().show();
                $('.quote-text').slideUp();
                $('.infographie').slideUp();
            })
        })

    }
});

function displayNumber(nb) {
    let string = nb.toString();

    if (nb >= 100000) {
        return  string.substr(0, 3) + ' ' + string.substr(3, string.length);
    }
    else if (nb >= 10000) {
        return string.substr(0, 2) + ' ' + string.substr(2, string.length);
    }
    else if (nb >= 1000) {
        return string.charAt(0) + ' ' + string.substr(1, string.length);
    }
    else
        return string;
}

function addVote() {
    var CountRef = database.ref('count');

    CountRef.once('value', function(snapshot) {
        $('#nb-sign').html(displayNumber(snapshot.val() + 1));
        database.ref('count').set(snapshot.val() + 1);
    });

}


function validateForm() {
    var check = true;

    $('.error').hide();
    $('#form input').each( function() {
        $(this).removeClass('red-border');
    });


    if ($("#f_email").val() === "") {
        $('.error-mail').show();
        $("#f_email").addClass('red-border');
        check = false;
    }
    if ($("#f_name").val() === "") {
        $('.error-name').show();
        $("#f_lastname").addClass('red-border');
        check = false;
    }
    if ($('#f_email').val() !== "") {
        if (!validateEmail($('#f_email').val())) {
            $('.error-mail-wrong').show();
            $('#f_email').addClass('red-border');
            check = false;
        }
    }
    if ($('#f_phone').val() != "") {
        if (!$("#f_phone").intlTelInput("isValidNumber")) {
            $('.error-phone-wrong').show();
            $('#f_phone').addClass('red-border');
            check = false;
        }
    }

    if (!check)
        $('form').focus();

    return check;
}



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function extractUrlParams(){
    var t = document.location.search.substring(1).split('&'); var f = [];
    for (var i=0; i<t.length; i++){
        var x = t[ i ].split('=');
        f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
};

function fillFieldsFromUrl() {
    var check = false;
    var p = extractUrlParams();
    var name = "";

    if (p['email'] && p['email'] !== "undefined") {
        $("#f_email").val(p['email']);
        check = true;
    }
    if (p['firstname'] && p['firstname'] !== "undefined") {
        name = p['firstname'];
        check = true;
    }
    if (p['lastname'] && p['lastname'] !== "undefined") {
        check = true;
        if (name === "")
            name = p['lastname'];
        else {
            name += " " + p['lastname'];

        }
    }
    if (p['phone'] && p['phone'] !== "undefined") {
        check = true;
        $("#f_phone").val(p['phone']);
    }

    if (check)
        $('#form .hidden').slideDown();

    $("#f_name").val(name);

}

