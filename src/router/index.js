import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  routes,
  scrollBehavior: () => ({ y: 0 })
})

// const whitelist = ['login']

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
  next()
})

/**
 * 路由完成
 */
router.afterEach(() => {
  store.commit('changeLoadingState', false)
})

export default router