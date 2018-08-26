/**
 * @file   性能监测 socket
 * @author chbless
 */

 /* eslint-disable */
maskShow('暂无监测对象接入...');

var socketServer = location.href + '?type=1';
var socket = io(socketServer);
var timer = null;

socket.on('connectionInfo', function (data) {
    maskHide();
    connectionInfoPaser(data);
});

socket.on('timing', function (data) {
    timingInfoPaser(data);
});

socket.on('rendering', function (data) {
    maskHide();
    clearTimeout(timer);

    renderingConfig.title.text = 'Monitoring Time: ' + Math.round(data.now / 1000) + ' s';

    renderingConfig.series[0].data[0].value = data.fps;
    renderingConfig.series[1].data[0].value = data.ms;
    renderingConfig.series[2].max = Math.round(data.mb.totalJSHeapSize / 1048576);
    renderingConfig.series[2].data[0].value = Math.round(data.mb.usedJSHeapSize / 1048576);

    renderingChart.setOption(renderingConfig);

    // FPS
    fpsConfig.xAxis[0].data.push(Math.round(data.now / 1000) + 's');
    fpsConfig.series[0].data.push(data.fps);

    fpsChart.setOption(fpsConfig);

    // MS
    msConfig.xAxis[0].data.push(Math.round(data.now / 1000) + 's');
    msConfig.series[0].data.push(data.ms);

    msChart.setOption(msConfig);

    timer = setTimeout(function() {
        maskShow('监测对象休眠中...');
    },2000);

});

socket.on('viewDisconnected', function (data) {

    clearTimeout(timer);

    renderingConfig.series[0].data[0].value = 0;
    renderingConfig.series[1].data[0].value = 0;
    renderingConfig.series[2].data[0].value = 0;

    renderingChart.setOption(renderingConfig);

    maskShow('监测对象断开连接...');
});
