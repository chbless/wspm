/**
 * @file    performance-client 客户端性能监听
 * @author  chbless
 */

 /* eslint-disable */
var performanceClient = function(ws) {

    var rAF = function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        )
    }();

    var socket = io(ws);
    var frame = 0;
    var ms = 0;
    var mb = {
        usedJSHeapSize: 0,
        totalJSHeapSize: 0
    };
    var lastTime = ( performance || Date ).now();
    var lastFameTime = ( performance || Date ).now();

    var loop = function () {
        var now = ( performance || Date ).now();
        var frameMs = now - lastFameTime;

        // 每秒内 单帧渲染时长Max
        if (ms < frameMs) {
            ms = Math.round(frameMs);
        }
        lastFameTime = now;
        frame++;

        if (now > 1000 + lastTime) {
            var fps = Math.round((frame * 1000) / (now - lastTime));
            if (mb.usedJSHeapSize < performance.memory.usedJSHeapSize) {
                mb.usedJSHeapSize = performance.memory.usedJSHeapSize;
            }
            if (mb.totalJSHeapSize < performance.memory.totalJSHeapSize) {
                mb.totalJSHeapSize = performance.memory.totalJSHeapSize;
            }
            socket.send({
                type: 'rendering',
                info: {
                    now: now,
                    fps: fps,
                    ms: ms,
                    mb: mb
                }
            });
            frame = 0;
            ms = 0;
            lastTime = now;
        }
        rAF(loop);
    };

    // 连接成功
    socket.on('connect', function (data) {
        console.log('connected');
        socket.send({
            type: 'timing',
            info: performance.timing
        });
        rAF(loop);
    });

};
