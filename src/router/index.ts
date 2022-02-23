import { createWebHistory, createRouter } from 'vue-router'
import Learn from '../views/Learn.vue'
import About from '../views/About.vue'

import Default from '../markdown/guides/default.md'
import GettingStarted from '../markdown/guides/Getting_Started.md'
import How_Snapps_Work from '../markdown/guides/How_Snapps_Work.md'

const routes = [
  {
    path: '/learn',
    name: 'Learn',
    component: Learn,
    children: [
      {
        path: '/learn',
        component: Default,
      },
      {
        path: '/learn/Getting_Started',
        component: GettingStarted,
      },
      {
        path: '/learn/How_Snapps_Work',
        component: How_Snapps_Work,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
