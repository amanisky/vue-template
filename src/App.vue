<template>
  <div id="app">
    <div class="icon-bar">
      <router-link :class="{ 'active': $route.name === 'gaode' }" :to="{ name: 'gaode', query: { lng: 114.356636, lat: 30.474788 }}"><i class="fa fa-street-view"></i></router-link>
      <router-link :class="{ 'active': $route.name === 'search' }" :to="{ name: 'search' }"><i class="fa fa-search"></i></router-link>
      <router-link :class="{ 'active': $route.name === 'chart' }" :to="{ name: 'chart', query: { code: 10000, mctype: 'dqhz', type: 'china' }}"><i class="fa fa-globe"></i></router-link> 
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
