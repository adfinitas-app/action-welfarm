function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

// Usage:

preload([
    "https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-Corrida-19/optin-unchecked.png",
    "https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-Corrida-19/optin-checked.png",
]);


var opts = {
    angle: -0.5, // The span of the gauge arc
    lineWidth: 0.04, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
        length: 0, // // Relative to gauge radius
        strokeWidth: 0, // The thickness
        color: '#959595' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#FFFFFF',   // Colors
    colorStop: '#959595',    // just experiment with them
    strokeColor: '#FFFFFF',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
};


$(window).scroll( function () {
    if ($(window).width() > 640)
        HandleScrollForm();

});

$(document).ready( function () {
    $("#f_phone").intlTelInput({
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.13/js/utils.js",
        initialCountry: "fr"
    });

    if ($(window).width() > 640)
        HandleScrollForm();

    $('#f_email').on('input', function() {
        $('#form .hidden').slideDown();
    });

    let checkClick = false;


    $('.petition p').click(function () {
        checkClick = true;
    });
    $('#close').click( function (e) {
        e.preventDefault();

        $('#petition').focus();
        $('body, html').css({margin: 0,height: 'auto',overflow: 'visible'});
        $('.petition').hide();
    });
    $('#petition').click( function (e) {
        e.preventDefault();

        $('body, html').css({margin: 0,height: '100%',overflow: 'hidden'});
        $('.petition p').focus();
        $('.petition').show();
    });

    $('.petition').click( function () {
        if ((!checkClick) && $('.petition').css('display') === 'block') {
            $('body, html').css({margin: 0,height: 'auto',overflow: 'visible'});
            $('.petition').hide();
        }
        checkClick = false;
    });
    $('#petition-bt-small').click(function (e) {
        e.preventDefault();
        $('#form').show();
    });
    $('#closeForm').click( function (e) {
        e.preventDefault();
        $('#form').hide();
    })
});


function HandleScrollForm() {
    if($('#form').offset().top + $('#form').height() >= $('#social').offset().top - 55)
        $('#form').css({'position':'absolute', top: $('#form').offset().top});
    if($(document).scrollTop() + window.innerHeight < $('#social').offset().top)
        $('#form').css({'position':'fixed', top: 120});
}


function 	scrollToNext(next){
    $('html, body').stop().animate({
        scrollTop: $(next).offset().top - 0
    }, 700, 'swing');
}


$.fn.gauge = function(opts) {
    this.each(function() {
        var $this = $(this),
            data = $this.data();

        if (data.gauge) {
            data.gauge.stop();
            delete data.gauge;
        }
        if (opts !== false) {
            data.gauge = new Gauge(this).setOptions(opts);
        }
    });
    return this;
};


function setGauge(gauge, nb) {
    gauge.maxValue = 1000;
    gauge.setMinValue(0);
    gauge.animationSpeed = 32;
    gauge.set(nb);

    setTimeout(function(){
        $('.gauge-container p').fadeIn();
    }, 1500);
}

