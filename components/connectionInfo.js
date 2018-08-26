/**
 * @file   parser
 * @author chbless
 */


 /* eslint-disable */
var userAgentInfo = null;
var parser = new UAParser();

var connectionInfoDom = document.getElementById('connection-info');
var connectionInfoTpl = [
    '<p>监控对象: <a href="{{referer}}" class="c1">{{referer}}</a></p>',
    '<p>接入时间: <span class="c1">{{time}}</span></p>'
];
var connectionInfoPaser = function(connectionInfo) {
    var connectionInfoHtml = connectionInfoTpl.join('');

    var connectionInfoHtml = template.render(connectionInfoTpl.join(''), connectionInfo);

    connectionInfoDom.innerHTML = connectionInfoHtml;
    connectionInfoDom.className = 'animated fadeIn';

    parser.setUA(connectionInfo.userAgent);
    userAgentInfo = parser.getResult();
};

var timingInfoDom = document.createElement('div');
var timingInfoTpl = [
    '<table class="info-box">',
    '<tr><td>userAgent</td><td colspan="3">{{userAgentInfo.ua}}</td></tr>',
    '<tr><td>浏览器</td><td>{{userAgentInfo.browser.name}} {{userAgentInfo.browser.major}}</td><td>版本</td><td>{{userAgentInfo.browser.version}}</td></tr>',
    '<tr><td>内核</td><td>{{userAgentInfo.engine.name}} {{userAgentInfo.engine.version}}</td><td>系统</td><td>{{userAgentInfo.os.name}} {{userAgentInfo.os.version}}</td></tr>',
    '<tr><td>DNS</td><td>{{dns}}s</td><td>TCP</td><td>{{tcp}}s</td></tr>',
    '<tr><td>request</td><td>{{request}}s</td><td>firstPaint</td><td>{{firstPaint}}s</td></tr>',
    '<tr><td>domParser</td><td>{{domParser}}s</td><td>domReady</td><td>{{domReady}}s</td></tr>',
    '<tr><td>onload</td><td>{{onload}}s</td></tr>',
    '</table>'
];

var timingInfoPaser = function(timingInfo) {

    var timingInfoHtml = template.render(timingInfoTpl.join(''), {
        dns: (timingInfo.domainLookupEnd - timingInfo.domainLookupStart) / 1000,
        tcp: (timingInfo.connectEnd - timingInfo.connectStart) / 1000,
        request: (timingInfo.responseEnd - timingInfo.responseStart) / 1000,
        domParser: (timingInfo.domComplete - timingInfo.domInteractive) / 1000,
        firstPaint: (timingInfo.responseStart - timingInfo.navigationStart) / 1000,
        domReady: (timingInfo.domContentLoadedEventEnd - timingInfo.navigationStart) / 1000,
        onload: (timingInfo.loadEventEnd - timingInfo.navigationStart) / 1000,
        userAgentInfo: userAgentInfo
    });

    var infoTip = document.createElement('div');
    infoTip.innerHTML = timingInfoHtml;
    tippy('#connection-info', {
        html: infoTip
    });
}
