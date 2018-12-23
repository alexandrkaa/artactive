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

//=require node_modules/picturefill/dist/picturefill.min.js
