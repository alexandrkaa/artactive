var supportsWebP = (function () {
  'use strict';

  var canvas = typeof document === 'object' ? document.createElement('canvas') : {};
  canvas.width = canvas.height = 1;
  var index = canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false;

  return index;

}());

if (!supportsWebP) {
  var webpAll = document.querySelectorAll('.webp');
  for(var i = 0; i < webpAll.length; i++) {
    var webp = webpAll[i];
    webp.classList.remove('webp');
    webp.classList.add('nowebp');
  }
}

var nojs = document.querySelector('.nojs');
nojs.classList.remove('nojs');
nojs.classList.add('js');

var mainMenu = document.querySelector('.main-nav');
mainMenu.classList.remove('main-nav--opened');
mainMenu.classList.add('main-nav--closed');

var mainMenuToggler = document.querySelector('.main-nav__toggle');
mainMenuToggler.addEventListener('click', function(e) {
  e.preventDefault();
  if (mainMenu.classList.contains('main-nav--closed')) {
    mainMenu.classList.remove('main-nav--closed');
    mainMenu.classList.remove('main-nav--animated');
    mainMenu.classList.add('main-nav--opened');
  } else {
    mainMenu.classList.remove('main-nav--opened');
    mainMenu.classList.add('main-nav--closed');
    mainMenu.classList.add('main-nav--animated');
  }
});

var heroScrolldown = document.querySelector('.hero__scroll-down');
var pageContent = document.querySelector('.page-content');
heroScrolldown.addEventListener('click', function(e) {
  e.preventDefault();
  pageContent.scrollIntoView(true);
});

var aboutScrollDown = document.querySelector('.about__scroll-down');
var services = document.querySelector('.services');
aboutScrollDown.addEventListener('click', function (e) {
  e.preventDefault();
  services.scrollIntoView(true);
});

//=require node_modules/picturefill/dist/picturefill.min.js
//=require node_modules\jquery\dist\jquery.min.js
// //=require node_modules\lettering\dist\lettering.min.js
