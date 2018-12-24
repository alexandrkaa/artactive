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

var nojs = document.querySelector(".nojs");
nojs.classList.remove("nojs");
nojs.classList.add("js");

var mainMenu = document.querySelector(".main-nav");
mainMenu.classList.remove("main-nav--opened");
mainMenu.classList.add("main-nav--closed");

var mainMenuToggler = document.querySelector(".main-nav__toggle");
mainMenuToggler.addEventListener("click", function(e) {
  e.preventDefault();
  if (mainMenu.classList.contains("main-nav--closed")) {
    mainMenu.classList.remove("main-nav--closed");
    mainMenu.classList.add("main-nav--opened");
  } else {
    mainMenu.classList.remove("main-nav--opened");
    mainMenu.classList.add("main-nav--closed");
  }
});

//=require node_modules/picturefill/dist/picturefill.min.js
