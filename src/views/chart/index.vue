<template>
  <div class="chart">
    <v-chart class="chartContainer" :options="echartMap" auto-resize />
  </div>
</template>

<script>
import axios from 'axios'
import mapCodes from '@/assets/china_regions/map.json'
import { mapOption } from './options'
export default {
  name: 'chart',
  data () {
    return {
      echartMap: null
    }
  },
  created () {
    let source = {
      code: "100000",
      highlights: [
        { name: "湖北省", code: "420000", type: "province" }
      ],
      name: "中国",
      type: null
    }

    let info = mapCodes[source.code]

    axios
      .get(info.map)
      .then(res => {
        this.echartMap = mapOption({
          map: res.data,
          mapInfo: info,
          highlights: source.highlights
        })
      })
  }
}
</script>

<style scoped>
.chart {
  height: 100vh;
}

.chartContainer {
  width: 100%;
  height: 100%;
  padding-top: 71px;
  box-sizing: border-box;
  background: url('../../assets/images/bg01.jpg') no-repeat 0 0 / cover;
}
</style>
