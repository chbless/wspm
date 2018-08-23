/**
 * @file   ConnectionInfo 组件
 * @author chbless
 */

 /* eslint-disable */
var parser = new UAParser();
var connectionInfoDom = document.getElementById('connection-info');
var connectionInfoTpl = [
    '<p><span class="referer">{{referer}}</span> 于 <span class="time">{{time}}</span> 接入监测</p>',
    '<pre>userAgent:{{userAgentParser}}</pre>'
];
var connectionInfoPaser = function(connectionInfo) {
    var connectionInfoHtml = connectionInfoTpl.join('');

    parser.setUA(connectionInfo.userAgent);
    var userAgentParser = parser.getResult();

    connectionInfoDom.innerHTML = connectionInfoHtml
        .replace('{{time}}', connectionInfo.time)
        .replace('{{referer}}', connectionInfo.referer)
        .replace('{{userAgent}}', connectionInfo.userAgent)
        .replace('{{userAgentParser}}', JSON.stringify(userAgentParser, null, 4));
    connectionInfoDom.className = 'animated fadeIn';
}
