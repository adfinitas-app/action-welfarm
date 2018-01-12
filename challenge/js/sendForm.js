$(document).ready(function() {
	$('#f_summit').click(function() {
		validateForm()
	});
	$("#f_tel").intlTelInput({
		initialCountry: "fr",
			onlyCountries: [
				"al", "ad", "at", "by", "be", "ba", "bg", "hr", "cz", "dk",
				"ee", "fo", "fi", "fr", "de", "gi", "gr", "va", "hu", "is", "ie", "it", "lv",
				"li", "lt", "lu", "mk", "mt", "md", "mc", "me", "nl", "no", "pl", "pt", "ro",
				"ru", "sm", "rs", "sk", "si", "es", "se", "ch", "ua", "gb"
			]
	});
	launchCount();
});

function launchCount()
{
	var url = 'https://form-to-db.herokuapp.com/count?table=welfarm_challenge';
	var method = 'GET';
	var xhr = new XMLHttpRequest();
    var to_add = 64;
	if ("withCredentials" in xhr) {
		xhr.onreadystatechange = function() {
			if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
				// Request finished. Do processing here.
				var counter = parseInt(xhr.responseText) + to_add;
				$('#nbVote').text(("00000" + counter.to_string()).slice(-5));
			}
		};
		xhr.onerror = function() {
			$('#nbVote').text('X');
		};
		xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined") {
		xhr = new XDomainRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
				// Request finished. Do processing here.
				var counter = parseInt(xhr.responseText) + to_add;
				$('#nbVote').text(("00000" + counter.to_string()).slice(-5));
			}
		};
		xhr.onerror = function() {
			$('#nbVote').text('X');
		};
		xhr.open(method, url);
	} else {
		// CORS not supported
		xhr = null;
	}
	if (!xhr) {
		alert('CORS not supported');
		return;
	}
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Authorization', 'Basic d2ViQGFkZmluaXRhcy5mcjphQiF6VzU7N1dxNH4=');
	console.log('sent');
	xhr.send();
}

function validateForm() {
	var emailID = document.getElementById('f_email').value;
	atpos = emailID.indexOf("@");
	dotpos = emailID.lastIndexOf(".");

	if (document.getElementById('f_name').value.length == 0) {
		$('.error_np').show();
		document.getElementById('f_name').focus();
		return false;
	} else
		$('.error_np').hide();

	if ((document.getElementById('f_prenom').value.length == 0)) {
		$('.error_np').show();
		document.getElementById('f_prenom').focus();
		return false;
	} else
		$('.error_np').hide();

	if ((document.getElementById('f_email').value.length == 0)) {
		$('.error_mail_none').show();
		document.getElementById('f_email').focus();
		return false;
	} else
		$('.error_mail_none').hide();

	if (atpos < 1 || (dotpos - atpos < 2) && index.html) {
		$('.error_mail').show();
		document.getElementById('f_email').focus();
		return false;
	} else
		$('.error_mail').hide();
	submitForm();
	fbq('track', 'CompleteRegistration');
	ga('send', 'event', 'inscription', 'formulaire');
	return true;
};

function submitForm() {
	var data = {
		"db": {
			"schema": "welfarm_challenge",
			"db": {
				"email": pureField($("input[name='email']").val()),
				"phone": pureField($("input[name='phone']").val()),
				"firstname": pureField($("input[name='firstname']").val().toUpperCase()),
				"lastname": pureField($("input[name='lastname']").val().toUpperCase()),
				"name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
				"language": $("input[name='language']").val(),
			}
		},
		//"grecaptcha_response": grecaptcha.getResponse()
	};
	makeCorsRequest(data);
	showNotif();
}

function pureField(string) {
	return (string.replace(/'/g, "%27").replace(/"/g, "&quot;"));
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
		// CORS not supported
		xhr = null;
	}
	return xhr;
}

function makeCorsRequest(data) {
	var url = 'https://adfinitas-io.herokuapp.com/api/v1/organization/c2ff768a-aa71-4234-b082-3c5f67318cd7/webhook/a8d03cd4-f87e-4a3c-b898-bb0876da1269';
	var body = JSON.stringify(data);
	var xhr = createCORSRequest('POST', url);
	if (!xhr) {
		alert('CORS not supported');
		return;
	}
	xhr.setRequestHeader('Content-Type', 'application/json');
	// Error Handler
	xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	};
	xhr.send(body);
}

function showNotif() {
	//afficher merci
	$('#form').html('<img alt="Séparateur verticale" src="https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/barre-form.png" style="height: 30px;" /><div style="padding: 0 30px;"><img alt="Merci!" src="https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/merci.png"/><p style="font-family: \'futuraExtCondItlObl\';font-size: 26px;text-align: center;line-height: 1.2;margin-bottom: 20px;">BRAVO POUR VOTRE ENGAGEMENT !</p><p style="font-family: \'futuraExtCondItlObl\';font-size: 17px;text-align: center;line-height: 1.2;margin-bottom: 20px;">NOUS VOUS INVITONS À LE PARTAGER SUR LES RÉSEAUX SOCIAUX</p><div><img alt="Facebook" class="button-partage" src="https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/bravo-fb.png" style="width: 28px; height: 55px;margin-right: 20px;cursor: pointer;"/><a target="_blank" href="https://twitter.com/intent/tweet?text=Je%20viens%20de%20m%E2%80%99engager%20%C3%A0%20passer%20des%20f%C3%AAtes%20sans%20foie%20gras.%20Vous%20aussi,%20relevez%20le%20d%C3%A9fi%20&hashtags=Z%C3%A9roFoieGras&via=WelfarmFR%20!%20http%3A%2F%2Fbit.ly%2FZeroFoieGras"><img alt="Twitter" src="https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/bravo-twitter.png" style="width: 51px; height: 39px;margin-right: 20px;"/></a><a target="_blank" href="https://www.instagram.com/welfarmfr/"><img alt="Instagram" src="https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/bravo-insta.png" style="width: 48px; height: 48px;"/></a></div><div class="text-left" style="height: 90px;"><a href="mailto:benevoles@welfarm.fr"><img alt="kit militant" src="https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/kit.png" style="position: relative;left: -18px;top: 6px;height: 70px;" /><span style="font-family: \'futuraExtCondItlObl\';font-size: 17px;color: black;float: right;width: 220px;display: inline-block;padding-top: 20px;text-align: center;">COMMANDEZ GRATUITEMENT VOTRE KIT MILITANT</span></a> 	</div></div>');
	var a = document.getElementsByClassName('button-partage');
	function fb() {
		FB.ui({
			method: 'share',
			display: 'popup',
			quote: "Je viens de m'engager à passer des fêtes sans souffrances animales avec l’association WELFARM. Vous aussi, relevez le challenge #ZéroFoieGras ! RDV sur http://bit.ly/ZeroFoieGras",
			href: 'http://action.welfarm.fr/challenge',
		}, function(response){});
	}
	console.log('a: ' + a.length);
	a[0].onclick = fb;
	a[1].onclick = fb;
	a[2].onclick = fb;
}

function extractUrlParams() {
	var match,
		urlParams,
		pl = /\+/g, // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		decode = function(s) {
			return decodeURIComponent(s.replace(pl, " "));
		},
		query = window.location.search.substring(1);

	urlParams = {};
	while (match = search.exec(query))
		urlParams[decode(match[1])] = decode(match[2]);
	return urlParams;
}

var p = extractUrlParams();
(function fillOutForm() {
	if ('lastname' in p)
		$('#f_name').val(p['lastname']);
	if ('firstname' in p)
		$('#f_prenom').val(p['firstname']);
	if ('email' in p)
		$('#f_email').val(p['email']);
	if ('phone' in p)
		$('#f_tel').val(p['phone']);
	if ('reserved_code_media' in p)
		$('#reserved_code_media').val(p['reserved_code_media']);
}());
