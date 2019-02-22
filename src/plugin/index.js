import '../assets/styles/app.css'
import ECharts from 'vue-echarts'
import VueAMap from 'vue-amap'
import Loading from '@/components/loading'

export default {
  install (Vue) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示。
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false

    // 当前环境
    Vue.prototype.$env = process.env.NODE_ENV

    // 当前的 baseUrl
    Vue.prototype.$baseUrl = process.env.BASE_URL
    
    Vue.component(Loading.name, Loading)

    Vue.component('v-chart', ECharts)
    Vue.use(VueAMap)

    VueAMap.initAMapApiLoader({
      key: 'c5275afb9258f34314bdbe23067c203d',
      plugin: ['AMap.Scale', 'AMap.ToolBar', 'AMap.MarkerClusterer', 'AMap.DistrictSearch', 'AMap.Autocomplete', 'AMap.OverView', 'AMap.PlaceSearch', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
      // 默认高德 sdk 版本为 1.4.4
      v: '1.4.4'
    })
  }
}