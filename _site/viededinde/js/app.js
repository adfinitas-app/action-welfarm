/* Smooth scroll */
var fbGlobal = new Firebase("https://viededinde-6f5e0.firebaseio.com/");
var merciPath = "/lp-2/index.html"

// Make sure firebase API is loaded
function counter(callbackFunction) {
  Firebase.goOnline();
  fbGlobal.child('counter').transaction(function(currentValue) {
    return (currentValue||0) + 1;
  }, function(err, committed, snapshot){
    if (committed){
      $("#nb-signatures").html(snapshot.val());
      //alert('ok :)');
      Firebase.goOffline();
      callbackFunction();
    }
    else {
      //alert('Error in counter ! Maybe you are hacking me ?');
    }
  });
}

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
         scrollTop: target.offset().top + 1
       }, 1000);
        return false;
      }
    }
  });
});

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
  var url = 'https://form-to-db.herokuapp.com/';
  var body = JSON.stringify(data);
  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  xhr.setRequestHeader('Content-Type', 'application/json');
  // Response handlers.
  xhr.onload = function() {
    //var text = xhr.responseText;
    //alert('Response from CORS request to ' + url + ': ' + text);
    scrollTo("#soutiens");
  };
  // Error Handler
  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };
  xhr.send(body);
}

function 	scrollTo(id)
{
	if ($(id).length != 0)
	{
		$('html, body').stop().animate({
			scrollTop: $(id).offset().top + 1
		}, 800, 'swing');
		return false;
	}
}

/*
 * Fin de la lib
 */

 function pureField(string) {
  return (string.replace(/'/g, "%27").replace(/"/g, "&quot;"));
}

function submitForm() {
  var infos = {};
  /* Si il y a un champ OPTIN sur le formulaire, et qu'il n'est pas coché,
     l'utilisateur ne doit surement pas remonter sur threads (voir avec le chef de projet).
     Pour effectuer ça, laisser le champ threads à undefined
     */
     if ($("input[name='optin']:checked").length == 1) {
      optin = true;
    } else {
      optin = false;
    }
    today = new Date();
    var data = {
      "schema": "viededinde",
      "db": {
        "firstname": pureField($("input[name='firstname']").val()),
        "lastname": pureField($("input[name='lastname']").val()),
        "email": pureField($("input[name='email']").val()),
        "phone": pureField($("input[name='phone']").val()),
        "optin": optin,
        "event": "petitionporcinet",
        "signin_date": today.toString()
      }
    }
    makeCorsRequest(data);
  }

  function extractUrlParams(){
    var t = document.location.search.substring(1).split('&'); var f = [];
    for (var i=0; i<t.length; i++){
      var x = t[ i ].split('=');
      f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
  };

  function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function removeClass()
  {
    if ($(this).attr("type") == "radio") {
      $("input[name=" + $(this).attr("name") + "]").parent().removeClass("error");
    } else {
      $(this).parent().removeClass("error");
    }
    $(this).off("change");
  }

  function showError(elem) {
    if (elem.attr("type") == "radio" || elem.attr("type") == "checkbox") {
      $("input[name=" + elem.attr("name") + "]").parent().addClass("error");
      $("input[name=" + elem.attr("name") + "]").on("change", removeClass);
    } else if (elem.prop("tagName") == "SELECT") {
      elem.parent().parent().addClass("error");
      elem.on("change", removeClass);
  } else if (elem.attr("name") == "phone") { // For intlTelInput only
    elem.parent().parent().addClass("error");
    elem.on("change", removeClass);
  } else {
    elem.parent().addClass("error");
    elem.on("change", removeClass);
  }
}

function isValid() {
  var status = true;
  $(".error").removeClass("error");
  $("form.petitionForm input").each(function() {
    if ($(this).attr("required") && $(this).attr != "submit") {
      if ($(this).attr("type") == "radio" || $(this).attr("type") == "checkbox") {
        if ($("input[name=" + $(this).attr("name") + "]:checked").length == 0) {
          showError($(this));
          status = false;
        }
      } else {
        if ($(this).val() == "" || $(this).val() == null ||
          ($(this).attr("type") == "email" && isValidEmail($(this).val()) == false) ||
          ($(this).attr("name") == "phone" && $(this).intlTelInput("isValidNumber") == false)) {
          showError($(this));
        status = false;
      }
    }
  }
});
  return (status);
}

function fillFieldsFromUrl() {
  p = extractUrlParams();

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
}

function  height_adjust()
{
  $(".media > div:last-child").css({"height":"auto"});
  var     max = $(".media > div:last-child").first().height();

  if ($(window).width() > 640)
  {
    $(".media > div:last-child").each(function()
    {
      if ($(this).height() > max)
        max = $(this).height();
    });
    max += 10;
    max = max + "px";
    $(".media > div:last-child").css({"height" : max});
  }
}

$(window).resize(function() {
  height_adjust();
});

$(window).load(function() {
  $('.block-list').equalize({
    children: '.block',
    equalize: 'outerHeight'
  });
});

function  show_submit_message()
{
  var     timer = 3000;

  $("#submit_message").slideDown(500, function()
  {
    window.setTimeout(function(){
      $("#submit_message").slideUp(500);
    }, timer);
  });
}

$(document).ready(function()
{
 fillFieldsFromUrl();
 $(".petitionForm").on("submit", function(e) {
  e.preventDefault();
  if (isValid() == true) {
    submitForm();
  }
});
 height_adjust();
 $("#id_phone").intlTelInput({
  utilsScript: "/js/tel-input/lib/libphonenumber/build/utils.js",
  initialCountry: "fr"
});

  fbGlobal.child("counter").once("value", function(snapshot) {
    $("#nb-signatures").html(snapshot.val());
    Firebase.goOffline();
  });
  
 $(".petitionForm").on("submit", function(e)
 {
  e.preventDefault();
  if (isValid() == true) {
     counter(submitForm);
     show_submit_message();
  }
});
 $(".social-network").on("click", function(e) { e.preventDefault(); window.open($(this).attr('href'),'Je partage', 'height=500,width=500'); });
});

$(document).foundation();
