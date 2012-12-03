window.addEvent('load', function(){
	// smooth anchor scrolling
	new SmoothScroll(); 
	// style area
	if(document.id('gkStyleArea')){
		document.id('gkStyleArea').getElements('a').each(function(element,i){
			element.addEvent('click',function(e){
	            e.stop();
				changeStyle(i+1);
			});
		});
	}
	// font-size switcher
	if(document.id('gkTools') && document.id('gkMainbody')) {
		var current_fs = 100;
		var content_fx = new Fx.Tween(document.id('gkMainbody'), { property: 'font-size', unit: '%', duration: 200 }).set(100);
		document.id('gkToolsInc').addEvent('click', function(e){ 
			e.stop(); 
			if(current_fs < 150) { 
				content_fx.start(current_fs + 10); 
				current_fs += 10; 
			} 
		});
		document.id('gkToolsReset').addEvent('click', function(e){ 
			e.stop(); 
			content_fx.start(100); 
			current_fs = 100; 
		});
		document.id('gkToolsDec').addEvent('click', function(e){ 
			e.stop(); 
			if(current_fs > 70) { 
				content_fx.start(current_fs - 10); 
				current_fs -= 10; 
			} 
		});
	}
	// K2 font-size switcher fix
	if(document.id('fontIncrease') && document.getElement('.itemIntroText')) {
		document.id('fontIncrease').addEvent('click', function() {
			document.getElement('.itemIntroText').set('class', 'itemIntroText largerFontSize');
		});
		
		document.id('fontDecrease').addEvent('click', function() {
			document.getElement('.itemIntroText').set('class', 'itemIntroText smallerFontSize');
		});
	}
	// login popup
	if(document.id('gkPopupLogin')) {
		var popup_overlay = document.id('gkPopupOverlay');
		popup_overlay.setStyles({'display': 'block', 'opacity': '0'});
		popup_overlay.fade('out');

		var opened_popup = null;
		var popup_login = null;
		var popup_login_h = null;
		var popup_login_fx = null;
		
		if(document.id('gkPopupLogin')) {
			popup_login = document.id('gkPopupLogin');
			popup_login.setStyle('display', 'block');
			popup_login_h = popup_login.getElement('.gkPopupWrap').getSize().y;
			popup_login_fx = new Fx.Morph(popup_login, {duration:200, transition: Fx.Transitions.Circ.easeInOut}).set({'opacity': 0, 'height': 0 }); 
			document.id('btnLogin').addEvent('click', function(e) {
				new Event(e).stop();
				popup_overlay.fade(0.45);
				popup_login_fx.start({'opacity':1, 'height': popup_login_h});
				opened_popup = 'login';
				
				(function() {
					if(document.id('modlgn-username')) {
						document.id('modlgn-username').focus();
					}
				}).delay(600);
			});
		}
		
		popup_overlay.addEvent('click', function() {
			if(opened_popup == 'login')	{
				popup_overlay.fade('out');
				popup_login_fx.start({
					'opacity' : 0,
					'height' : 0
				});
			}	
		});
	}
});
// function to set cookie
function setCookie(c_name, value, expire) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expire);
	document.cookie=c_name+ "=" +escape(value) + ((expire==null) ? "" : ";expires=" + exdate.toUTCString());
}
// Function to change styles
function changeStyle(style){
	var file1 = $GK_TMPL_URL+'/css/style'+style+'.css';
	var file2 = $GK_TMPL_URL+'/css/typography/typography.style'+style+'.css';
	var file3 = $GK_TMPL_URL+'/css/typography/typography.iconset.style'+style+'.css';
	new Asset.css(file1);
	new Asset.css(file2);
	new Asset.css(file3);
	Cookie.write('gk_fest_j25_style', style, { duration:365, path: '/' });
}
// Template animations
Array.prototype.shuffle = function() {
 	var len = this.length;
	var i = len;
	 while (i--) {
	 	var p = parseInt(Math.random()*len);
		var t = this[i];
  	this[i] = this[p];
  	this[p] = t;
 	}
};

window.addEvent('load', function() {
	var animations = [];
	
	document.getElements('.gk-animation').each(function(el, i) {
		animations.push(new GKAnimation(el));
	});
	
	if(document.getElement('.gk-sponsors')) {
		var sponsorsLoaded = false;
		
		window.addEvent('scroll', function(e) {
			if(!sponsorsLoaded) {
				var currentPosition = window.getScroll().y;
				var sponsorsWrap = document.getElement('.gk-sponsors');
				if(currentPosition + window.getSize().y - 200 >= sponsorsWrap.getPosition().y) {
					var elements = [];
					
					for(var i = 0; i < sponsorsWrap.getElement('div').getElements('a').length; i++) {
						elements.push(i);
					}
					
					elements.shuffle();
					
					var sponsorsArray = sponsorsWrap.getElement('div').getElements('a');
					
					for(var j = 0; j < elements.length; j++) {
						GKAnimateSponsor(sponsorsArray, elements, j);
					}
					
					sponsorsLoaded = true;
				}
			}
		});	
	}
	
	if(document.getElement('.gkK2EventPages') && document.getElement('.gkK2EventPages').getElements('.gk-sponsors-wrap')) {
		var sponsors = document.getElement('.gkK2EventPages').getElements('.gk-sponsors-wrap');

		var j = 0;
		
		sponsors.each(function(el, i) {
			el.getElements('a').each(function(elm) {
				GKAnimateSponsorLogo(elm, j);
				j++;
			});
		});
	}
	
	setTimeout(function() {
		if(document.getElement('.gk-jscounter')) {
			document.getElements('.gk-jscounter').each(function(el, i) {
				new GKCounter(el);
			});
		}
	}, 250);
});

var GKCounter = new Class({
	final: null,
	element: null,
	finalText: '',
	dcount: null,
	hcount: null,
	mcount: null,
	scount: null,
	tempDays: 0,
	tempHours: 0,
	tempMins: 0,
	tempSecs: 0,
	
	initialize: function(el) {
		// set the element handler
		this.element = el;
		// get the date and time
		var dateEnd = this.element.get('data-dateend');
		var timeEnd = this.element.get('data-timeend');
		// parse the date and time
		dateEnd = dateEnd.split('-');
		timeEnd = timeEnd.split(':');
		// get the timezone of the date
		var dateTimezone = -1 * parseInt(this.element.get('data-timezone'), 10) * 60;
		// calculate the final date timestamp
		this.final = Date.UTC(dateEnd[2], (dateEnd[1] * 1) - 1, dateEnd[0], timeEnd[0], timeEnd[1]);
		//
		// calculate the final date according to user timezone
		//
		// - get the user timezone
		var tempd = new Date();
		var userTimezone = tempd.getTimezoneOffset();
		var newTimezoneOffset = 0;
		// if the timezones are equal - do nothing, in the other case we need calculations:
		if(dateTimezone !== userTimezone) {
			newTimezoneOffset = userTimezone - dateTimezone;
			// calculate new timezone offset to miliseconds
			newTimezoneOffset = newTimezoneOffset * 60 * 1000;
		}
		// calculate the new final time according to time offset
		this.final = this.final + newTimezoneOffset;
		
		//
		// So now we know the final time - let's calculate the base time for the counter:
		//
		
		// create the new date object
		var d = new Date();
		// calculate the current date timestamp
		var current = Date.UTC(d.getFullYear(), d.getMonth(), d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds());
		
		//
		// calculate the difference between the dates
		//
		var diff = this.final - current;
		
		// if the difference is smaller than 3 seconds - then the counting was ended
		if(diff < 30 * 1000) {
			this.finalText = this.element.innerHTML;
			this.element.innerHTML = '';
			this.countingEnded(); 
		} else {
			// in other case - let's calculate the difference in the days, hours, minutes and seconds
			var leftDays = 0;
			var leftHours = 0;
			var leftMinutes = 0;
			var leftSeconds = 0;
			
			leftDays = Math.floor((1.0 * diff) / (24 * 60 * 60 * 1000));
			var tempDiff = diff - (leftDays * 24 * 60 * 60 * 1000);
			leftHours = Math.floor(tempDiff / (60 * 60 * 1000));
			tempDiff = tempDiff - (leftHours * 60 * 60 * 1000);
			leftMinutes = Math.floor(tempDiff / (60 * 1000));
			tempDiff = tempDiff - (leftMinutes * 60 * 1000);
			leftSeconds = Math.floor(tempDiff / 1000);
			// initialize the structure
			this.initCounter();
			// set the counter handlers
			this.dcount = this.element.getElement('.gk-jscounter-days strong');
			this.hcount = this.element.getElement('.gk-jscounter-hours strong');
			this.mcount = this.element.getElement('.gk-jscounter-min strong');
			this.scount = this.element.getElement('.gk-jscounter-sec strong');
			// run the initial animation
			this.tick();
		}
	},
	
	// function used to create the counter structure
	initCounter: function() {
		// init the structure
		this.finalText = this.element.innerHTML;
		// get the texts translations (if available)
		var dtext = this.element.get('data-daystext') || "days";
		var htext = this.element.get('data-hourstext') || "hours";
		var mtext = this.element.get('data-mintext') || "min.";
		var stext = this.element.get('data-sectext') || "sec.";
		//
		this.element.set('html', '<div class="gk-jscounter-days"><strong>00</strong><small>' + dtext + '</small></div><div class="gk-jscounter-hours"><strong>00</strong><small>' + htext + '</small></div><div class="gk-jscounter-min"><strong>00</strong><small>' + mtext + '</small></div><div class="gk-jscounter-sec"><strong>00</strong><small>' + stext + '</small></div>');
	},
	
	// function used to tick the counter ;-)
	tick: function() {
		// create the new date object
		var d = new Date();
		// calculate the current date timestamp
		var current = Date.UTC(d.getFullYear(), d.getMonth(), d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds());
		//
		// calculate the difference between the dates
		//
		var diff = this.final - current;
		
		// if the difference is smaller than 1 second - then the counting was ended
		if(diff < 1 * 1000) {
			this.countingEnded(); 
		} else {
			// in other case - let's calculate the difference in the days, hours, minutes and seconds
			var leftDays = 0;
			var leftHours = 0;
			var leftMinutes = 0;
			var leftSeconds = 0;
			
			leftDays = Math.floor((1.0 * diff) / (24 * 60 * 60 * 1000));
			var tempDiff = diff - (leftDays * 24 * 60 * 60 * 1000);
			leftHours = Math.floor(tempDiff / (60 * 60 * 1000));
			tempDiff = tempDiff - (leftHours * 60 * 60 * 1000);
			leftMinutes = Math.floor(tempDiff / (60 * 1000));
			tempDiff = tempDiff - (leftMinutes * 60 * 1000);
			leftSeconds = Math.floor(tempDiff / 1000);
			
			this.dcount.set('text', ((leftDays < 10) ? '0' : '') + leftDays);
			this.hcount.set('text', ((leftHours < 10) ? '0' : '') + leftHours)
			this.mcount.set('text', ((leftMinutes < 10) ? '0' : '') + leftMinutes)
			this.scount.set('text', ((leftSeconds < 10) ? '0' : '') + leftSeconds);
			
			var $this = this;
			
			setTimeout(function() {
				$this.tick();
			}, 1000);
		}
	},
	
	// function used when the time is up ;-)
	countingEnded: function() {
		// set the H3 element with the final text
		this.element.set('html', '<h3>' + this.finalText + '</h3>');
	}
});

var GKAnimateSponsorLogo = function(logo, i) {
	setTimeout(function() {
		logo.addClass('active');
	}, i * 65);
};

var GKAnimateSponsor = function(sponsorsArray, elements, j) {
	(function() {
		var sponsor = sponsorsArray[elements[j]];
		sponsor.addClass('active');
	}).delay(j * 50);	
};

var GKAnimation = new Class({
	elements: null,
	elementsProperties: [],
	wrapper: null,
	wrapperArea: null,
	wrapperHeight: null,
	wrapperWrap: null,
	
	initialize: function(element) {
		// set the main parallax wrapper
		this.wrapper = element;
		// set the wrapper height
		this.wrapperHeight = this.wrapper.get('data-height').toInt();
		// set the wrapper wrap
		this.wrapperWrap = this.wrapper.getElement('div');
		// show the area
		this.show();
	},
	// Show the parallax area
	show: function() {
		var $this = this;
		this.wrapper.addClass('loaded');
		this.wrapperWrap.setStyle('overflow', 'visible');
		
		// set the elements
		this.initElements();
		
		new Fx.Tween(this.wrapperWrap, {
			duration: 300,
			onComplete: function() {
				$this.wrapper.addClass('displayed');	
			}
		}).start('height', this.wrapperHeight);
	},
	// Initialize the objects inside parallax area
	initElements: function() {
		var elements = this.wrapperWrap.getChildren();
		var animationStack = [];
		//
		elements.each(function(element) {
			//
			var delay = element.get('data-delay') || 500;
			var start = JSON.decode(element.get('data-start'));
			var end = JSON.decode(element.get('data-end'));
			var time = element.get('data-time') || 500;
			//
			element.setStyles(start);
			//
			animationStack.push([element, end, time, delay]);
		});
		//
		var $this = this;
		//
		animationStack.each(function(animation){
			$this.animate(animation);
		});
	},
	// Animation function connected with the onScroll Window event
	animate: function(animation) {
		(function() {			
			new Fx.Morph(animation[0], { duration: animation[2] }).start(animation[1]);
			
			if(animation[0].hasClass('gk-scale-up')) {
				animation[0].removeClass('gk-scale-up');
			}
		}).delay(animation[3]);
	}
});