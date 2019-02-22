<template>
  <div id="app">
    <div class="icon-bar">
      <router-link :class="{ 'active': $route.name === 'gaode' }" :to="{ name: 'gaode' }"><i class="fa fa-globe"></i></router-link>
      <router-link :class="{ 'active': $route.name === 'chart' }" :to="{ name: 'chart' }"><i class="fa fa-line-chart"></i></router-link> 
    </div>
    <router-view />
    <loading />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
.icon-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: #555;
  z-index: 9999;
}

.icon-bar a {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  transition: all 0.3s ease;
  color: white;
  font-size: 36px;
}

.icon-bar a:hover {
  background-color: #000;
}

.active {
  background-color: #4CAF50;
}
</style>
