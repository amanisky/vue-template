import ECharts from 'vue-echarts'
import mapCodes from '@/assets/china_regions/map.json'

/**
 * 获取饼图配置
 * @param { Array } input 数据
 * @returns { Object } 饼图配置项
 */
export function pieOption (input)  {
  return {
    tooltip: {
      trigger: 'item',
      confine: true,
      formatter: "{b}: {c} ({d}%)"
    },
    series: [
      {
        type:'pie',
        radius: ['40%', '50%'],
        clockWise: false,
        label: {
          show: true,
          color: '#fff',
          formatter: (params) => {
            let percent = 0
            let total = 0
            for (let i = 0; i < input.length; i++) {
              total += input[i].value
            }
            percent = total === 0 ? 0 : ((params.value / total) * 100).toFixed(0)
            return params.name + "：" + params.value + '\n' + '占比：' + percent + '%'
          }
        },
        data: input
      }
    ],
    graphic: {
      type: 'text',
      // 相对父元素居中
      left: 'center',
      // 相对父元素居中
      top: 'middle',
      style: {
        fill: '#fff',
        text: input.length === 0 ? '暂无数据' : '',
        font: '14px Microsoft YaHei'
      }
    }
  }
}

/**
 * 获取折线图配置
 * @param { Object } input 数据
 * @param { Array } input.date 日期数组
 * @param { Object[] } input.series 数据数组
 * @param { String } input.series[].name 描述数据
 * @param { Array } input.series[].data 数据数组
 * @returns { Object } 折线图配置
 */
export function lineOption (input) {
  let series = []
  input.series.forEach(item => {
    series.push({
      name: item.name,
      type: 'line',
      data: item.data
    })
  })
  return {
    tooltip: {
      trigger: 'axis',
      confine: true,
      axisPointer: {
        type: 'shadow',
        textStyle: {
          color: '#fff'
        }
      }
    },
    grid: {
      top: '10%',
      right: '3%',
      bottom: '8%',
      left: '2%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
      data: input.date
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#fff'
        }
      }
    },
    series
  }
}

export function barOption (input) {
  return {
    tooltip: {
      trigger: 'axis',
      confine: true,
      axisPointer : {
        type: 'shadow'
      }
    },
    grid: {
      top: '10%',
      right: '3%',
      bottom: '8%',
      left: '2%',
      containLabel: true
    },
    xAxis: {
      type : 'category',
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#fff'
        }
      },
      data: input.date,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#fff'
        }
      }
    },
    series: [
      {
        type: 'bar',
        barWidth: '40%',
        data: input.series
      }
    ]
  }
}

export function mapOption (inputData) {
  let { map, mapInfo, highlights } = inputData
  if (!map) {
    return {}
  }
  ECharts.registerMap(mapInfo.pinyin, map)
  let regions = highlights.map(item => {
    if (mapCodes[item.code]) {
      return { code: item.code, name: mapCodes[item.code].name, type: item.type, itemStyle: { areaColor: '#fb7293' }, emphasis: { itemStyle: { areaColor: '#e58d89' } } }
    } else {
      return { code: item.code, name: item.name, type: item.type, itemStyle: { areaColor: '#fb7293' }, emphasis: { itemStyle: { areaColor: '#e58d89' } } }
    }
  })
  return {
    // 地理坐标系组件
    geo: {
      // 地图类型；默认为空
      map: mapInfo.pinyin,
      // 是否开启鼠标缩放和平移漫游；默认不开启
      roam: true,
      // 图形上的文本标签
      label: {
        show: true,
        color: '#fff'
      },
      // 地图区域的多边形图形样式
      itemStyle: {
        color: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [{
            // 0% 处的颜色
            offset: 0,
            color: 'rgba(147, 235, 248, 0)'
          }, {
            // 100% 处的颜色
            offset: 1,
            color: 'rgba(147, 235, 248, .3)'
          }]
        },
        borderWidth: 1,
        borderColor: 'dodgerblue'
      },
      // 高亮状态下的多边形和标签样式
      emphasis: {
        label: {
          color: '#fff'
        },
        itemStyle: {
          areaColor: 'rgba(56, 155, 183, 0.5)'
        }
      },
      // 在地图中对特定的区域配置样式
      regions,
      zoom: 1.2
    }
    // series: [
    //   {
    //     name: 'Top 5',
    //     type: 'effectScatter',
    //     coordinateSystem: 'geo',
    //     data: [ { name: '合肥', value: [ 117.27, 31.86, 229 ] }, { name: '武汉', value: [ 114.31, 30.52, 273 ] }, { name: '大庆', value: [ 125.03, 46.58, 279 ] } ],
    //     symbolSize: val => val[2] / 20,
    //     showEffectOn: 'render',
    //     rippleEffect: {
    //       brushType: 'stroke'
    //     },
    //     hoverAnimation: true,
    //     label: {
    //       normal: {
    //         formatter: '{b}',
    //         position: 'right',
    //         show: true
    //       }
    //     },
    //     itemStyle: {
    //       normal: {
    //         color: '#f4e925',
    //         shadowBlur: 10,
    //         shadowColor: '#333'
    //       }
    //     }
    //   }
    // ]
  }
}
