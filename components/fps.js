/**
 * @file   FPS 组件
 * @author chbless
 */

 /* eslint-disable */
var fpsChart = echarts.init(document.getElementById('fps-info'));

var fpsConfig = {

    title: [{
        left: 'center',
        text: 'FPS',
        textStyle: {
            color: '#ccc'
        },
    }],
    textStyle: {
        color: '#ccc',
        fontSize: '14'
    },
    xAxis: [{
        show: false,
        data: []
    }],
    yAxis: [{
        splitNumber: 2,
        axisLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        splitLine: {
            show: false
        }
    }],
    tooltip: {
        trigger: 'axis'
    },
    series: [{
        type: 'line',
        symbol: 'none',
        sampling: 'min',
        itemStyle: {
            normal: {
                color: 'rgb(255, 70, 131)'
            }
        },
        lineStyle: {
            opacity: 0
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                }, {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                }])
            }
        },
        markLine: {
            silent: true,
            data: [{
                yAxis: 30
            }, {
                yAxis: 60
            }]
        },
        data: []
    }]
};
