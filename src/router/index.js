// Composables
import { createRouter, createWebHashHistory } from 'vue-router'
import Selector from '../components/Selector/Selector.vue'
import NotFoundComponent from '../components/NotFoundComponent.vue'
import SillySeason from '../components/Silly/SillySeason.vue'
import Rolex from '../components/Rolex.vue'
import Wordle from '../components/Wordle/Wordle.vue'
import LeadersCircle from '../components/LeadersCircle.vue'
import Ladder from '../components/Ladder.vue'

const routes = [
  {
    path: '/',
    redirect: { name: 'Home' },
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Selector
      },
      {
        path: '/leaders',
        name: 'Leaders Circle Standings',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: LeadersCircle
      },
      {
        path: '/silly',
        name: 'Silly',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: SillySeason
      },
      {
        path: '/daytona',
        name: 'Rolex',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Rolex
      },
      {
        path: '/wordle',
        name: 'Wordle',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Wordle
      },
      {
        path: '/ladder',
        name: 'Ladder',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Ladder
      },
      {
        path: '/selector',
        name: 'Selector',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Selector
      },
      { 
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: SillySeason
      }
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
