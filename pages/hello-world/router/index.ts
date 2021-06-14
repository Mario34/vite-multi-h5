import { createRouter, createWebHashHistory } from 'vue-router'
import beforeEach from './before-each'

const routes = [
  {
    path: '/home',
    meta: {
      title: 'home',
    },
    component: () => import('/@r/pages/hello-world/views/home.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('/@r/pages/hello-world/views/404.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

beforeEach(router)

export default router
