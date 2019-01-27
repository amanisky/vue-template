<template>
  <div class="dashboard">
    <div class="amapContainer" ref="amapContainer"></div>
  </div>
</template>

<script>
import { lazyAMapApiLoaderInstance } from 'vue-amap'
import red from '@/assets/images/red.gif'
import orange from '@/assets/images/orange.gif'
import yellow from '@/assets/images/yellow.gif'
export default {
  name: 'dashboard',
  data () {
    return {
      gaodeMap: null
    }
  },
  mounted () {
    lazyAMapApiLoaderInstance.load().then(() => {
      let positions = [
        { name: '生科楼', position: [114.353591, 30.473239], state: 2 },
        { name: '食科楼', position: [114.357296, 30.473323], state: 1 },
        { name: '水产楼', position: [114.357292, 30.472732], state: 3 },
        { name: '图书馆', position: [114.357328, 30.471589], state: 0 },
        { name: '学生事务大楼', position: [114.362728, 30.473219], state: 0 },
        { name: '作物楼', position: [114.363842, 30.477475], state: 3 },
        { name: '真菌楼', position: [114.359925, 30.477259], state: 0 },
        { name: '求实楼', position: [114.358641, 30.472209], state: 1 },
        { name: '植保科研楼', position: [114.356977, 30.477473], state: 2 },
        { name: '工程楼', position: [114.359044, 30.473388], state: 1 },
        { name: '昆虫楼', position: [114.35381, 30.472211], state: 0 },
      ]

      let markers = []

      this.gaodeMap = new AMap.Map(this.$refs.amapContainer, {
        // 是否监控地图容器尺寸变化
        resizeEnable: true,
        // 地图中心点坐标值（经度、纬度）
        center: [114.356636, 30.474788],
        // 地图显示的缩放级别（3-18）
        zoom: 16,
        // 地图效果
        viewMode: '3D',
        // 地图俯仰角度（0-83）
        pitch: 70,
        // 地图旋转角度
        // rotation: 90,
        // 地图主题
        mapStyle: "amap://styles/dark"
      })

      // 信息窗体
      let infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -20) })

      // 报警
      let redIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(30, 30),
        // 图标的取图地址
        image: red,
        // 图标所用图片大小
        imageSize: new AMap.Size(30, 30),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(0, 0)
      })
      
      // 隐患
      let orangeIcon = new AMap.Icon({
        size: new AMap.Size(30, 30),
        image: orange,
        imageSize: new AMap.Size(30, 30),
        imageOffset: new AMap.Pixel(0, 0)
      })
      
      // 故障
      let yellowIcon = new AMap.Icon({
        size: new AMap.Size(30, 30),
        image: yellow,
        imageSize: new AMap.Size(30, 30),
        imageOffset: new AMap.Pixel(0, 0)
      })

      let clusterer = new AMap.MarkerClusterer(this.gaodeMap)

      clusterer.setGridSize(80)

      clusterer.setStyles([{
        url: 'https://webapi.amap.com/theme/v1.3/m3.png',
        size: new AMap.Size(66, 66),
        offset: new AMap.Pixel(-33, -33),
        textColor: '#fff'
      }])

      // setInterval(() => {
      // 轮询时需要清除聚合点，否则会重复添加
      //   clusterer.clearMarkers()
      // }, 5000)
      
      positions.forEach(item => {
        let marker = new AMap.Marker({
          map: this.gaodeMap,
          offset: new AMap.Pixel(-15, -15),
          position: item.position
        })

        marker.content = item.name

        marker.on('mouseover', (e) => {
          infoWindow.setContent(`<div style="color: #619ed1; padding-left: 8px;">${e.target.content}`)
          infoWindow.open(this.gaodeMap, e.target.getPosition())
        })

        marker.on('mouseout', () => infoWindow.close())

        marker.on('click', () => this.gaodeMap.setCenter(item.position))

        switch(item.state) {
          case 1:
            marker.setIcon(redIcon)
            break
          case 2:
            marker.setIcon(orangeIcon)
            break
          case 3:
            marker.setIcon(yellowIcon)
            break
          default:
            marker.setOffset(new AMap.Pixel(-10, -34))
        }

        markers.push(marker)
      })

      clusterer.addMarkers(markers)

      this.gaodeMap.on('click', function(e) {
        console.log(e.lnglat.getLng() + ', ' + e.lnglat.getLat())
      })
    })
  }
}
</script>

<style scoped>
.dashboard {
  height: 100vh;
}

.amapContainer {
  height: 100%;
}
</style>
