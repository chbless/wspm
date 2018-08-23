/**
 * @file   Timing 组件
 * @author chbless
 */

 /* eslint-disable */

var timingInfoDom = document.getElementById('timing-info');
var timingInfoTpl = [
    '<p>DNS查询耗时: {{dns}} s</p>',
    '<p>TCP链接耗时: {{tcp}} s</p>',
    '<p>request请求耗时: {{request}} s</p>',
    '<p>DOM树解析耗时: {{domParser}} s</p>',
    '<p>白屏时间: {{whiteScreen}} s</p>',
    '<p>domReady时间: {{domready}} s</p>',
    '<p>onload时间: {{onload}} s</p>'
    // '<p>timingInfo: {{timingInfo}}</p>'
]
var timingInfoPaser = function(timingInfo) {

    var timingInfoHtml = timingInfoTpl.join('');

    var dns = (timingInfo.domainLookupEnd - timingInfo.domainLookupStart) / 1000;
    var tcp = (timingInfo.connectEnd - timingInfo.connectStart) / 1000;
    var request = (timingInfo.responseEnd - timingInfo.responseStart) / 1000;
    var domParser = (timingInfo.domComplete - timingInfo.domInteractive) / 1000;
    var whiteScreen = (timingInfo.responseStart - timingInfo.navigationStart) / 1000;
    var domready = (timingInfo.domContentLoadedEventEnd - timingInfo.navigationStart) / 1000;
    var onload = (timingInfo.loadEventEnd - timingInfo.navigationStart) / 1000;

    timingInfoDom.innerHTML = timingInfoHtml
        .replace('{{dns}}', dns)
        .replace('{{tcp}}', tcp)
        .replace('{{request}}', request)
        .replace('{{domParser}}', domParser)
        .replace('{{whiteScreen}}', whiteScreen)
        .replace('{{domready}}', domready)
        .replace('{{onload}}', onload);
        // .replace('{{timingInfo}}', JSON.stringify(timingInfo, null, 4));
        timingInfoDom.className = 'animated fadeIn';

}
