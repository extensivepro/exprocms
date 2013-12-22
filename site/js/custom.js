/*

Template Name: Superawesome
Template Demo: http://awerest.com/demo/superawesome
Author: Awerest
Author website: http://awerest.com
Description: Retina Bootstrap App Landing Page For MODX
Tags: Responsive, Mobile First, Retina, Bootstrap 3, Landing Page, One Page, App, iOS, iPhone, iPad, Agency, Clean, Creative, Minimal, Multi-Purpose

Version: 2.0

---------------

Table of Contents:

1) Animated Elements
2) Custom Scrollbar
3) Smooth Scroll on Anchors
4) Background Stretch and Slide
5) Responsive video
6) Href # Fix
7) Contact Form
8) Preloader

---------------

*/

$(document).ready(function() {
	'use strict';

/* ==== 1) Animated elements ==== */

	if ($('.no-touch').length) {
		skrollr.init({
			easing: 'sqrt',
			smoothScrolling: true,
			forceHeight: false
		});
	}

/* ==== 2) Custom Scrollbar ==== */
/*
  $('html, .modal').niceScroll({
    scrollspeed: 60,
    mousescrollstep: 35,
    cursorwidth: 10,
    cursorborder: 0,
    cursorcolor: '#e3e4e5',
    cursorborderradius: '3px',
    autohidemode: false,
    horizrailenabled: false,
    smoothscroll: false,
  });
*/
/* ==== 3) Smooth Scroll on Anchors ==== */

	$('#features .col-lg-6 a, #features .col-lg-8 a, a.go-top')
		.bind('click', function(event) {
			var $anchor = $(this),
			scrollVal = $($anchor.attr('href')).offset().top +1

			if (scrollVal < 0) {
			  scrollVal = 0;
			}

			$.scrollTo(scrollVal, {
			  easing: 'easeInOutExpo',
			  duration: 1500
			});

			event.preventDefault();
 		});
		$.localScroll.hash({
			target: 'body',
			queue: true,
			duration: 1500
		});
		$.localScroll({
			target: 'body',
			queue: true,
			duration: 1000,
			hash: false,
			onBefore:function( e, anchor, $target ){
			},
			onAfter:function( anchor, settings ){
			}
		});

/* ==== 4) Background Stretch and Slide ==== */

	$("#home, #terms").backstretch([
		"img/bg_1.jpg",
		"img/bg_2.jpg",
		"img/bg_3.jpg"    
	], {duration: 5000, fade: 500});

/* ==== 5) Responsive video ==== */

	$('.video').fitVids();


/* ==== 6) Href # Fix ==== */

	$('a[href="#"]').click(function() {
		return false;
	});

/* ==== 7) Form ==== */

	$('.flowuplabels').FlowupLabels({
	        feature_onInitLoad: false, 
	        class_focused:      'focused',
	        class_populated:    'populated' 
	});

	var options = {
		target: '.message .alert',
		beforeSubmit: showRequest,
		success: showResponse
		};

	$('#contactForm').ajaxForm(options);

	function showRequest(formData, jqForm, options) {
		var queryString = $.param(formData);
			return true;
		}
	function showResponse(responseText, statusText)  {
		}
	$.fn.clearForm = function() {
		return this.each(function() {
			var type = this.type, tag = this.tagName.toLowerCase();
			if (tag == 'form')
				return $(':input',this).clearForm();
			if (type == 'text' || type == 'password' || tag == 'textarea')
				this.value = '';
			else if (type == 'checkbox' || type == 'radio')
				this.checked = false;
			else if (tag == 'select')
				this.selectedIndex = -1;
			});
		};

});

/* ==== 8) Preloader ==== */

$(window).load(function() {
	'use strict';

	$(window).scrollTop(0);
	$('#status').fadeOut();
	$('#preloader').delay(350).fadeOut('slow');

});