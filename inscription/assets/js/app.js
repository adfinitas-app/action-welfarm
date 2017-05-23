    $(function(){
      $("#f_tel").intlTelInput({initialCountry: "fr", onlyCountries: ["al", "ad", "at", "by", "be", "ba", "bg", "hr", "cz", "dk", 
        "ee", "fo", "fi", "fr", "de", "gi", "gr", "va", "hu", "is", "ie", "it", "lv", 
        "li", "lt", "lu", "mk", "mt", "md", "mc", "me", "nl", "no", "pl", "pt", "ro", 
        "ru", "sm", "rs", "sk", "si", "es", "se", "ch", "ua", "gb"] });
    });


    $(document).ready( function() {
      if (  ($('#section-form').height() + $('header').height()) <  $(window).height() )
        $('#section-form').height($(window).height() - ($('header').height() + $('footer').height()));
    });
    $(window).resize( function() {
      if (  ($('#section-form').height() + $('header').height()) <  $(window).height() )
        $('#section-form').height($(window).height() - ($('header').height() + $('footer').height()));
    });
    
    $(function() {
      $(".max-length").keyup(function () {
        if (this.value.length == this.maxLength) {
          $(this).next('.max-length').focus();
        }
        else if (this.value.length > this.maxLength) {
          $(this).val($(this).val().substr(0, $(this).val().length - 1));
        }
      });
    });

    function validateForm(mode) {
      var check = 0;
      var emailID = $("input[name='email']").val();
      atpos = emailID.indexOf("@");
      dotpos = emailID.lastIndexOf(".");


      $("input").each( function() {
        if ($(this).hasClass('mandatory') && $(this).val().length == 0) {
          check++;
          $(this).css('border','1px solid red');
        }
        else
          $(this).css('border','1px solid #cacaca');
        $("form div label").css('color','black');
      });

      if($("input[name='civility']").length && (!$("input[name='civility']:checked").val())) {
        check ++;
        $('[type=radio]+label').css('color', 'red');
      }
      else {
        $('[type=radio]+label').css('color', 'black');
      }
      $('.error').hide();

      if (check != 0) {
        $('.g_error').show();
        return false;
      }
      else 
        $('.g_error').hide();

      if (atpos < 1 || ( dotpos - atpos < 2 ) && index.html) 
      {
        $('.error_mail').show();
        $("input[name='email']").css('border','1px solid red');
        $("input[name='email']").focus() ;
        return false;
      }
      else
        $('.error_mail').hide();


      submitForm();
      showNotif();
    }



    function showNotif() {
      $('.notification').slideDown( "slow", function() {
        setTimeout(function(){
          $('.notification').slideUp("slow");
        }, 5000);
      });
    }
    function recaptchaCallback() {
      $('#f_summit').removeAttr('disabled');
    };

    function extractUrlParams(){
      var t = document.location.search.substring(1).split('&'); var f = [];
      for (var i=0; i<t.length; i++){
       var x = t[ i ].split('=');
       f[x[0]]=decodeURIComponent(x[1]);
     }
     return f;
   };

   var p = extractUrlParams();

   if (p['email'] && p['email'] != "undefined") {
    $("input[name=email]").val(p['email']);
  }

  if (p['firstname'] && p['firstname'] != "undefined") {
    $("input[name=firstname]").val(p['firstname']);
  }

  if (p['lastname'] && p['lastname'] != "undefined") {
    $("input[name=lastname]").val(p['lastname']);
  }

  if (p['phone'] && p['phone'] != "undefined") {
    $("input[name=phone]").val(p['phone']);
  }


/*
 * Debut de la lib
 */

 function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
}
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}
function makeCorsRequest(data) {
  var url = 'https://adfinitas-io.herokuapp.com/api/v1/organization/eda21ae3-54fb-49b9-a819-48b8a6f96697/webhook/a2e55464-7fc6-4da1-84b8-045f0b09a4d2';
  var body = JSON.stringify(data);
  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(body);
}

/*
 * Fin de la lib
 */

 function pureField(string) {
  return (string.replace(/'/g, "%27").replace(/"/g, "&quot;"));
}


function getSexe() {
  if (pureField($("input[name='civility']:checked").val()) == 'Madame') {
    return 'Femme';
  } else {
    return 'Homme';
  }
}

function getCivilityDear() {
  if (pureField($("input[name='civility']:checked").val()) == 'Madame') {
    return 'Chère';
  } else {
    return 'Cher';
  }
}

function getCivilityLong() {
  if (pureField($("input[name='civility']:checked").val()) == 'Madame') {
    return 'MADAME';
  } else {
    return 'MONSIEUR';
  }
}


function submitForm(mode) {

  var data = {
    "db": {
      "schema": "welfarm_newsletter",
      "db": {
        "email": pureField($("input[name='email']").val()),
        "phone": pureField($("input[name='phone']").val()),
        "sexe": getSexe(),
        "civility": pureField($("input[name='civility']:checked").val()),
        "civility_dear": getCivilityDear(),
        "civility_long": getCivilityLong(),
        "personnalisation": getCivilityDear() + ' ' + pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' + pureField($("input[name='lastname']").val()).toUpperCase(),
        "personnalisation_courte": pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' + pureField($("input[name='lastname']").val()).toUpperCase(),
        "firstname": pureField($("input[name='firstname']").val()),
        "lastname": pureField($("input[name='lastname']").val()),
        "name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
        "language": pureField($("input[name='language']").val())
      }
    },
    "mailjet": {
      "Email": pureField($("input[name='email']").val()),
      "Properties": {
        "sexe": getSexe(),
        "civility": pureField($("input[name='civility']:checked").val()),
        "civility_dear": getCivilityDear(),
        "civility_long": getCivilityLong(),
        "personnalisation": getCivilityDear() + ' ' + pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' + pureField($("input[name='lastname']").val()).toUpperCase(),
        "personnalisation_courte": pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' + pureField($("input[name='lastname']").val()).toUpperCase(),
        "firstname": pureField($("input[name='firstname']").val()),
        "lastname": pureField($("input[name='lastname']").val()),
        "name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
        "language": pureField($("input[name='language']").val())
      },
      "addLists": [],
      "delLists": []
    },
    "grecaptcha_response": grecaptcha.getResponse()
  }
  makeCorsRequest(data);
}

function checkPhone() {
  $phone = $("#f_tel");
  if ($phone.intlTelInput("isValidNumber")) {
   $phone.get(0).setCustomValidity("");
 } else {
   $phone.get(0).setCustomValidity("Numéro de téléphone invalide");
 }
}

var submitted = false;
function launchTemplate() {
  $("#f_tel").intlTelInput({
   utilsScript: "/js/vendor/intl-tel-input/build/js/utils.js",
   initialCountry: "fr"
 });
  $("#f_tel").get(0).onchange = checkPhone;
  $('form').on('submit', function(e) {
   e.preventDefault();
   if (grecaptcha.getResponse().length == 0) {
    alert('Merci de remplir le reCaptcha');
    return;
  }
  if (!$('form').attr('disabled')) {
    $('form').attr('disabled', 'disabled')
    submitForm(function success() {
     $('.success').css('display', 'block');
     var url = $('#sondage-btn').attr('href');
     var params = {
      'firstname_hide': $('input[name=firstname]').val(),
      'lastname_hide': $('input[name=lastname]').val(),
      'phone_hide': $('input[name=phone]').val(),
      'email_hide': $('input[name=email]').val()
    };
    $('#sondage-btn').attr('href', url + '?' + $.param(params, true));
  }, function error() {
   alert('Woops, there was an error making the request.');
   $('form').removeAttr('disabled')
 });
  }
});
}

$(document).ready(launchTemplate);


function    scrollTo(next){
  if ($(next).length != 0)
  {
    $('html, body').stop().animate({
      scrollTop: $(next).offset().top + 1
    }, 700, 'swing');
    return false;
  }
};