<template>
  <div class="search">
    <div class="amapContainer" ref="amapContainer"></div>
    <input type="text" class="auto" ref="auto">
  </div>
</template>

<script>
import { lazyAMapApiLoaderInstance } from 'vue-amap'

export default {
  name: 'search',
  data () {
    return {
      // 高德地图
      gaodeMap: null,
      auto: null,
      keyword: null
    }
  },
  mounted () {
    lazyAMapApiLoaderInstance.load().then(() => {
      this.gaodeMap = new AMap.Map(this.$refs.amapContainer, {
        // 是否监控地图容器尺寸变化
        resizeEnable: true,
        // 地图中心点坐标值（经度、纬度）
        // center: this.center,
        // 地图显示的缩放级别（3-18）
        zoom: 16,
        // 地图效果
        viewMode: '3D',
        // 地图俯仰角度（0-83）
        pitch: 40,
        // 地图旋转角度
        // rotation: 90,
        // 地图主题
        mapStyle: "amap://styles/dark",
        features: ['bg', 'road', 'building', 'point']
      })

      this.gaodeMap.on('click', function(e) {
          var lng = e.lnglat.getLng();
          var lat = e.lnglat.getLat();
          // console.log("经度："+lng+"纬度"+lat);
          var lnglatXY = [lng, lat];//地图上所标点的坐标
          AMap.service('AMap.Geocoder',function() {//回调函数
              let geocoder = new AMap.Geocoder({
              });
              geocoder.getAddress(lnglatXY, function (status, result) {
                  if (status === 'complete' && result.info === 'OK') {
                      //获得了有效的地址信息:
                      //即，result.regeocode.formattedAddress
                      console.log(result.regeocode.formattedAddress);
                      var address = result.regeocode.formattedAddress;
                  } else {
                      //获取地址失败
                  }
              });
          })
      })

      // 输入提示
      let auto = new AMap.Autocomplete({
        input: this.$refs.auto
      })

      // 构造地点查询类
      let placeSearch = new AMap.PlaceSearch({
        map: this.gaodeMap
      })
      
      AMap.event.addListener(auto, "select", res => {
        placeSearch.setCity(res.poi.adcode)
        placeSearch.search(res.poi.name)
      })
    })
  }
}
</script>

<style scoped>
.search {
  height: 100vh;
  padding-top: 71px;
  box-sizing: border-box;
}

.amapContainer {
  height: 100%;
}

.auto {
  position: absolute;
  top: 81px;
  right: 10px;
  width: 330px;
  height: 40px;
  color: #666;
  padding: 0 10px;
  border: none;
  outline: none;
}
</style>
