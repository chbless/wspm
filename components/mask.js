/**
 * @file   Mask 组件
 * @author chbless
 */

 /* eslint-disable */
var maskDom = document.getElementById('mask');
var maskShow = function(text) {
    maskDom.innerHTML = text;
    maskDom.className = 'show';
};
var maskHide = function() {
    maskDom.innerHTML = '';
    maskDom.className = '';
};
