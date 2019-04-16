const constantRouterMap = [
  { path: '/', redirect: { name: 'gaode' }},
  { path: '/gaode', name: 'gaode', component: () => import('@/views/gaode') },
  { path: '/search', name: 'search', component: () => import('@/views/search') },
  { path: '/chart', name: 'chart', component: () => import('@/views/chart') }
]

export default constantRouterMap