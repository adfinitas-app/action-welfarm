$(document).ready(function () {
	function my_isMobile() {
		if ($(window).width() >= 1024) {
			return (false);
		}
		else {
			return (true);
		}
	}

	function largeScroll(topForm)
	{
		if (!my_isMobile()) {
			var offset = $(window).scrollTop();
			var end = $('#endForm').offset().top;
			var form = $('#form');

			console.log('end: ' + end);
			console.log('topForm: ' + topForm);
			if (offset >= topForm) {
				form.css({
					'position': 'fixed',
					'top': '0px'
				});
			} else if (offset <= topForm) {
				form.css({
					'position': 'static'
				});
			}
			if (form.offset().top >= end) {
				form.css({
					'position': 'absolute',
					'top': end + 'px'
				});
			}
		}
	}

	function getChallenge() {
		return ([
			{titre: 'UNE DÉTENTION<br>EN CAGE', phrase: 'DURANT LES 2 SEMAINES DE GAVAGES, LES CANARDS SONT DÉTENUS DANS DES CAGES COLLECTIVES.'},
			{titre: 'WELFARM', phrase: 'AGIT DEPUIS PLUS DE 20 ANS POUR AMÉLIORER LES CONDITIONS D’ÉLEVAGE, DE TRANSPORT ET D’ABATTAGE DES ANIMAUX. L’ASSOCIATION, DONT LA MISSION EST RECONNUE D’UTILITÉ PUBLIQUE, ŒUVRE AUPRÈS DU GRAND PUBLIC, DES ÉLEVEURS, DES ACTEURS DE L’AGROALIMENTAIRE ET DE LA GRANDE DISTRIBUTION AINSI QUE DES INSTITUTIONS PUBLIQUES POUR UNE MEILLEURE PRISE EN COMPTE DU BIEN-ÊTRE ANIMAL.'},
			{titre: 'NUMÉRO 1 :<br>LA FRANCE', phrase: 'NOTRE PAYS EST LE PREMIER PRODUCTEUR ET CONSOMMATEUR DE FOIE GRAS. MAIS LA TRADITION PEUT-ELLE JUSTIFIER AUTANT DE SOUFFRANCE&nbsp;?'},
			{titre: 'LES CANES VICTIMES<br> COLLATÉRALES DE LA<br> PRODUCTION DE FOIE GRAS', phrase: 'MOINS RENTABLES QUE LES MÂLES POUR LA PRODUCTION DE FOIE GRAS, 35 MILLIONS DE CANETONS FEMELLES SONT CHAQUE ANNÉE BROYÉES QUELQUES HEURES APRÈS LEUR NAISSANCE.'},
			{titre: 'PROBLÈMES DE<br>SANTÉ', phrase: 'EN PÉRIODE DE GAVAGE, LES PROBLÈMES DIGESTIFS ET RESPIRATOIRES SONT ANORMALEMENT NOMBREUX. LES CANARDS PEINENT À SE DÉPLACER. LE TAUX DE MORTALITÉ PEUT-ÊTRE DE 10 À 20 FOIS SUPÉRIEUR DURANT LA PÉRIODE DE GAVAGE.'},
			{titre: 'UN GAVAGE RAPIDE<br> ET FORCÉ', phrase: 'EN 2 À 3 SECONDES, LES CANARDS REÇOIVENT D’IMPORTANTES QUANTITÉS DE NOURRITURE DÉVERSÉE DIRECTEMENT DANS LE JABOT AVEC UN TUBE.'},
			{titre: 'UNE RATION DISPROPORTIONNÉE', phrase: 'EN FIN DE PÉRIODE DE GAVAGE,LES CANARDS INGURGITENT DE FORCE JUSQU’À 900 G DE NOURRITURE PAR JOUR, CONTRE 300 G ENVIRON DEUX SEMAINES PLUS TÔT. NOMBRE D’ENTRE EUX HALÈTENT ET SUFFOQUENT'},
		]);
	}

	function resizeHeight(x, y, selector)
	{
		var imgWidth = x;
		var imgHeight = y;
		var ratio = imgWidth / imgHeight;

		var elem = $(selector);
		elem.css('height', parseInt(elem.width() / ratio) + 'px');
	}

	function launchResize() {
		if (!my_isMobile()) {
			resizeHeight(932, 221, '#header-1-large');
			resizeHeight(322, 370, '#header-2r-large');
		} else {
			resizeHeight(878, 286, '#header-1');
		}
	}

	function resetChallenge() {
		$('.challenge-titre').html('LA SITUATION');
		$('.challenge-text').html('CHAQUE ANNÉE, EN FRANCE, 35&nbsp;MILLIONS DE CANARDS MÂLES SONT GAVÉS POUR LA PRODUCTION DE FOIE GRAS, MAGRETS, ET CONFITS. LE GAVAGE FORCÉ FAIT SOUFFRIR LES ANIMAUX. CLIQUEZ SUR LES ICONES POUR DÉCOUVRIR LA RÉALITÉ DE CETTE INDUSTRIE.');
		if (1) {
			$('.challenge-text').css('top', '0px');
			$('.challenge-titre').css('top', '-20px');
			if (my_isMobile()) {
				$('.challenge-text').css({
					'font-size': '12px',
					'left': '20px',
					'top': '-15px'
				});
				$('.challenge-titre').css({
					'font-size': '18px',
					'top': '-35px'
				});

			} else {
				$('.challenge-text').css('font-size', '16px');
				$('.challenge-titre').css('font-size', '24px');
			}
		}
	}

	function changeChallenge(number) {
		var chall = getChallenge();

		$('.challenge-titre').html(chall[number - 1].titre);
		$('.challenge-text').html(chall[number - 1].phrase);
		if (number === 1) {
			if (my_isMobile()) {
				$('.challenge-text').css('top', '10px');
			} else {
				$('.challenge-text').css('top', '30px');
				//$('.challenge-titre').css();
			}
		} else if (number === 2) { // logo WELFARM
			if (my_isMobile()) {
				$('.challenge-text').css({'font-size': '9px', 'top': '0px'});
			} else {
				$('.challenge-text').css({'top': '-20px', 'font-size': '14px'});
				$('.challenge-titre').css('top', '-25px');
			}
		} else if (number === 3) {
			if (my_isMobile()) {
				$('.challenge-text').css('top', '10px');
			} else {
				$('.challenge-text').css('top', '30px');
			}
		} else if (number === 4) { // logo Femelles
			if (my_isMobile()) {
				$('.challenge-titre').css('font-size', '16px');
				$('.challenge-text').css({'font-size': '11px', 'top': '30px'});
			} else {
				$('.challenge-text').css({'top': '40px', 'font-size': '14px'});
				$('.challenge-titre').css('font-size', '18px');
			}
		} else if (number === 5) {
			if (my_isMobile()) {
				$('.challenge-titre').css('font-size', '17px');
				$('.challenge-text').css({'top': '0px', 'font-size': '12px'});
			} else {
				$('.challenge-text').css('top', '0px');
			}
		} else if (number === 6) {
			if (my_isMobile()) {
				$('.challenge-text').css('top', '10px');
			} else {
				$('.challenge-text').css('top', '30px');
			}
		} else if (number === 7) {
			if (my_isMobile()) {
				$('.challenge-text').css('top', '10px');
			} else {
				$('.challenge-text').css('top', '30px');
			}
		}
	}

	var isMobile = my_isMobile();
	launchResize();
	$(window).resize(function() {
		launchResize();
		if (isMobile === false && my_isMobile()) {
			isMobile = true;
			resetChallenge();
			//fix
			$('#form').css({
				'position': 'static'
			});
		} else if (isMobile === true && !my_isMobile()) {
			isMobile = false;
			resetChallenge();
			//fix
			setTimeout(function() {
				topForm = 57;
				largeScroll(topForm);
			}, 100);
		}
	});

	var topForm = $('#form').offset().top;

	$(window).scroll(function() {
		largeScroll(topForm);
	});

	$('.chall').hover(function() {
		var src = $(this).attr('src');
		var number = src.slice(src.length - 5, src.length - 4);

		changeChallenge(parseInt(number));
		$(this).attr('src', src.slice(0, src.length - 4) + '-black.png'); // change src to -black.png
	}, function() {
		var src = $(this).attr('src');

		resetChallenge();
		$(this).attr('src', src.slice(0, src.length - 10) + '.png'); // change src to normal.png
	});

var images = new Array();

function preload() {
	for (i = 0; i < preload.arguments.length; i++) {
		images[i] = new Image()
		images[i].src = preload.arguments[i]
	}
}

preload(
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/challenge-picto-1-black.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/challenge-picto-2-black.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/challenge-picto-3-black.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/challenge-picto-4-black.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/challenge-picto-5-black.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/challenge-picto-6-black.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/challenge-picto-7-black.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/merci.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/bravo-fb.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/bravo-twitter.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/bravo-insta.png"
)

});
