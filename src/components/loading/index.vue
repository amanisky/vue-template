<template>
  <div class="loading" v-if="loadingState">
    <div class="loading-text">数据加载中</div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  computed: {
    loadingState () {
      return this.$store.state.loadingState
    }
  }
}
</script>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  background-color: rgba(32, 41, 58, 1);
}

.loading-text {
  position: relative;
  width: 200px;
  height: 200px;
  line-height: 200px;
  font-size: 20px;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  background-color: rgba(32, 41, 58, .5);
  animation: text 3s ease infinite;
}

.loading-text::after {
  position: absolute;
  content: "";
  top: -5%;
  left: -5%;
  right: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transform: scale(0.85);
  filter: blur(5vw);
  background: linear-gradient(270deg, #00fcbd, #7400f9);
  background-size: 150% 150%;
  border-radius: 50%;
  animation: glowmation 3s linear infinite;
}

@keyframes glowmation {
  0% {
    top: -3%;
    left: -3%;
    background-position: 0% 50%;
    background-size: 150% 150%;
  }
  12.5% {
    top: -3%;
    left: 0;
    background-size: 70% 30%;
  }
  25% {
    top: -3%;
    left: 3%;
    background-size: 100% 50%;
  }
  37.5% {
    top: 0;
    left: 3%;
    background-size: 70% 30%;
  }
  50% {
    top: 3%;
    left: 3%;
    background-position: 100% 50%;
    background-size: 30% 30%;
  }
  62.5% {
    top: 3%;
    left: 0;
    background-size: 30% 70%;
  }
  75% {
    top: 3%;
    left: -3%;
    background-size: 50% 100%;
  }
  87.5% {
    top: 0;
    left: -3%;
    background-size: 30% 70%;
  }
  100% {
    top: -3%;
    left: -3%;
    background-position: 0% 50%;
    background-size: 150% 150%;
  }
}

@keyframes text {
  0% {
    color: #256cb3;
  }
  50% {
    color: #00fcbd;
  }
  100% {
    color: #fff;
  }
}
</style>
