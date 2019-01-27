const constantRouterMap = [
  { path: '/', redirect: { name: 'dashboard' }},
  { path: '/dashboard', name: 'dashboard', component: () => import('@/views/dashboard') }
]

export default constantRouterMap