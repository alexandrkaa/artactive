var supportsWebP = (function () {
  'use strict';

  var canvas = typeof document === 'object' ? document.createElement('canvas') : {};
  canvas.width = canvas.height = 1;
  var index = canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false;

  return index;

}());

if (supportsWebP) {
  var noWebpAll = document.querySelectorAll('.nowebp');
  for(var i = 0; i < noWebpAll.length; i++) {
    var noWebp = noWebpAll[i];
    noWebp.classList.remove('nowebp');
    noWebp.classList.add('webp');
  }
}

//=require node_modules/picturefill/dist/picturefill.min.js
