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

	var isMobile = my_isMobile();
	launchResize();
	$(window).resize(function() {
		launchResize();
		if (isMobile === false && my_isMobile()) {
			isMobile = true;
			//fix
			var activeChallenge = $('.chall.active');
			if (activeChallenge.length > 0) {
				activeChallenge.removeClass('active');
				var tmp = activeChallenge.attr('src').split('/');
				var activeNumber = tmp[tmp.length - 1].split('-')[2][0];
				activeChallenge.attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/challenge-picto-' + activeNumber + '.png');
				showChallenge(0);
			} else {
				showChallenge(0);
			}

			$('#form').css({
				'position': 'static'
			});
		} else if (isMobile === true && !my_isMobile()) {
			isMobile = false;
			//fix
			var activeChallenge = $('.chall.active');
			if (activeChallenge.length > 0) {
				activeChallenge.removeClass('active');
				var tmp = activeChallenge.attr('src').split('/');
				var activeNumber = tmp[tmp.length - 1].split('-')[2][0];
				activeChallenge.attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/challenge-picto-' + activeNumber + '.png');
				showChallenge(0);
			} else {
				showChallenge(0);
			}
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
		"https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/bravo-insta.png",
		"https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/kit.png"
	);

	$('.button-challenge').click(function() {
		var anchor;
		var offset;
		anchor = my_isMobile() ? "#anchorMobile" : "#header-1-large";
		offset = my_isMobile() ? 10 : 40;
		$('html, body').animate({
			scrollTop:   $(anchor).offset().top + $(anchor).height() - offset
		});
	});


	var chall = [
		{
			titre: 'LA SITUATION',
			text: 'CHAQUE ANNÉE, EN FRANCE, 35&nbsp;MILLIONS DE CANARDS MÂLES SONT GAVÉS POUR LA PRODUCTION DE FOIE GRAS, MAGRETS, ET CONFITS. LE GAVAGE FORCÉ FAIT SOUFFRIR LES ANIMAUX. CLIQUEZ SUR LES ICONES POUR DÉCOUVRIR LA RÉALITÉ DE CETTE INDUSTRIE.',
			style: {
				mobile: {
					titre: {'font-size': '18px', 'top': '-35px'},
					text: {'font-size': '12px', 'top': '-15px'}
				},
				desktop: {
					titre: {'font-size': '24px', 'top': '-20px'},
					text: {'font-size': '16px', 'top': '-10px'}
				}
			},
			number: 0
		},
		{
			titre: 'UNE DÉTENTION',
			text: 'DURANT LES 2 SEMAINES DE GAVAGES, LES CANARDS SONT DÉTENUS DANS DES CAGES COLLECTIVES.',
			style: {
				mobile: {
					titre: {'font-size': '18px', 'top': '-35px'},
					text: {'font-size': '12px', 'top': '10px',}
				},
				desktop: {
					titre: {'font-size': '28px', 'top': '10px'},
					text: {'font-size': '18px', 'top': '30px'}
				}
			},
			number: 1
		},
		{
			titre: 'WELFARM',
			text: 'AGIT DEPUIS PLUS DE 20 ANS POUR AMÉLIORER LES CONDITIONS D’ÉLEVAGE, DE TRANSPORT ET D’ABATTAGE DES ANIMAUX. L’ASSOCIATION, DONT LA MISSION EST RECONNUE D’UTILITÉ PUBLIQUE, ŒUVRE AUPRÈS DU GRAND PUBLIC, DES ÉLEVEURS, DES ACTEURS DE L’AGROALIMENTAIRE ET DE LA GRANDE DISTRIBUTION AINSI QUE DES INSTITUTIONS PUBLIQUES POUR UNE MEILLEURE PRISE EN COMPTE DU BIEN-ÊTRE ANIMAL.',
			style: {
				mobile: {
					titre: {'font-size': '18px', 'top': '-35px'},
					text: {'font-size': '9px', 'top': '0px'}
				},
				desktop: {
					titre: {'font-size': '24px','top': '-25px'},
					text: {'font-size': '14px', 'top': '-20px'}
				}
			},
			number: 2
		},
		{
			titre: 'NUMÉRO 1 :<br>LA FRANCE',
			text: 'NOTRE PAYS EST LE PREMIER PRODUCTEUR ET CONSOMMATEUR DE FOIE GRAS. MAIS LA TRADITION PEUT-ELLE JUSTIFIER AUTANT DE SOUFFRANCE&nbsp;?',
			style: {
				mobile: {
					titre: {'font-size': '18px', 'top': '-35px'},
					text: {'font-size': '12px', 'top': '10px'}
				},
				desktop: {
					titre: {'font-size': '24px', 'top': '-20px'},
					text: {'font-size': '16px', 'top': '20px'}
				}
			},
			number: 3
		},
		{
			titre: 'LES CANES VICTIMES<br> COLLATÉRALES DE LA<br> PRODUCTION DE FOIE GRAS',
			text: 'MOINS RENTABLES QUE LES MÂLES POUR LA PRODUCTION DE FOIE GRAS, 35 MILLIONS DE CANETONS FEMELLES SONT CHAQUE ANNÉE BROYÉES QUELQUES HEURES APRÈS LEUR NAISSANCE.',
			style: {
				mobile: {
					titre: {'font-size': '16px', 'top': '-35px'},
					text: {'font-size': '11px', 'top': '30px'}
				},
				desktop: {
					titre: {'font-size': '20px', 'top': '-20px'},
					text: {'font-size': '15px', 'top': '40px'}
				}
			},
			number: 4
		},
		{
			titre: 'PROBLÈMES DE<br>SANTÉ',
			text: 'EN PÉRIODE DE GAVAGE, LES PROBLÈMES DIGESTIFS ET RESPIRATOIRES SONT ANORMALEMENT NOMBREUX. LES CANARDS PEINENT À SE DÉPLACER. LE TAUX DE MORTALITÉ PEUT-ÊTRE DE 10 À 20 FOIS SUPÉRIEUR DURANT LA PÉRIODE DE GAVAGE.',
			style: {
				mobile: {
					titre: {'font-size': '17px', 'top': '-35px'},
					text: {'font-size': '12px', 'top': '0px'}
				},
				desktop: {
					titre: {'font-size': '24px', 'top': '-20px'},
					text: {'font-size': '16px', 'top': '10px'}
				}
			},
			number: 5
		},
		{
			titre: 'UN GAVAGE RAPIDE<br> ET FORCÉ',
			text: 'EN 2 À 3 SECONDES, LES CANARDS REÇOIVENT D’IMPORTANTES QUANTITÉS DE NOURRITURE DÉVERSÉE DIRECTEMENT DANS LE JABOT AVEC UN TUBE.',
			style: {
				mobile: {
					titre: {'font-size': '18px', 'top': '-35px'},
					text: {'font-size': '12px', 'top': '10px'}
				},
				desktop: {
					titre: {'font-size': '24px', 'top': '-20px'},
					text: {'font-size': '16px', 'top': '30px'}
				}
			},
			number: 6
		},
		{
			titre: 'UNE RATION DISPROPORTIONNÉE',
			text: 'EN FIN DE PÉRIODE DE GAVAGE,LES CANARDS INGURGITENT DE FORCE JUSQU’À 900 G DE NOURRITURE PAR JOUR, CONTRE 300 G ENVIRON DEUX SEMAINES PLUS TÔT. NOMBRE D’ENTRE EUX HALÈTENT ET SUFFOQUENT',
			style: {
				mobile: {
					titre: {'font-size': '18px', 'top': '-35px'},
					text: {'font-size': '12px', 'top': '10px'}
				},
				desktop: {
					titre: {'font-size': '24px', 'top': '-10px'},
					text: {'font-size': '16px', 'top': '30px'}
				}
			},
			number: 7
		}
	];

	function showChallenge(number, that) {
		var titre = $('.challenge-titre');
		var text = $('.challenge-text');
		var textStyle = my_isMobile() ? chall[number].style.mobile.text : chall[number].style.desktop.text;
		var titreStyle = my_isMobile() ? chall[number].style.mobile.titre : chall[number].style.desktop.titre;

		titre.html(chall[number].titre).css(titreStyle);
		text.html(chall[number].text).css(textStyle);
		if (number > 0) {
			// change images
			that.attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/challenge-picto-' + number + '-black' + '.png');
		}
	}

	$('.chall')
	.mouseenter(function() {
		if ($(this).hasClass('active')) {
			return false;
		}
		var src = $(this).attr('src');
		var tmp = src.split('/');
		var number = tmp[tmp.length - 1].split('-')[2][0];

		showChallenge(parseInt(number), $(this));
	})

	.mouseleave(function() {
		if ($(this).hasClass('active')) {
			return false;
		}
		var activeChallenge;
		var src = $(this).attr('src');
		var tmp = src.split('/');
		var number = tmp[tmp.length - 1].split('-')[2][0];

		activeChallenge = $('.chall.active');
		if (activeChallenge.length < 1) {
			$(this).attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/challenge-picto-' + number + '.png');
			showChallenge(0);
		} else {
			var tmp = activeChallenge.attr('src').split('/');
			var activeNumber = tmp[tmp.length - 1].split('-')[2][0];

			showChallenge(activeNumber, activeChallenge);
			$(this).attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/challenge-picto-' + number + '.png');
		}
	})

	.click(function(e) {
		e.preventDefault();
		var src = $(this).attr('src');
		var tmp = src.split('/');
		var number = tmp[tmp.length - 1].split('-')[2][0];
		var activeChallenge = $('.chall.active');

		if (activeChallenge.length > 0) {
			var tmp = activeChallenge.attr('src').split('/');
			var activeNumber = tmp[tmp.length - 1].split('-')[2][0];

			if (activeNumber === number) {
				$(this).attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/challenge-picto-' + number + '.png').removeClass('active');
				showChallenge(0);
				return true;
			}
			$('.chall.active').attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/challenge-picto-' + activeNumber + '.png').removeClass('active');
		}

		$(this).attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/WELFARM/petition_foiegras_2017/challenge-picto-' + number + '-black' + '.png');
		$(this).addClass('active');
	});
	showChallenge(0);
});
