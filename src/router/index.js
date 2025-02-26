// Composables
import { createRouter, createWebHashHistory } from 'vue-router'
import Selector from '../components/Selector/Selector.vue'
import NotFoundComponent from '../components/NotFoundComponent.vue'
import SillySeason from '../components/Silly/SillySeason.vue'
import Rolex from '../components/Rolex.vue'
import Wordle from '../components/Wordle/Wordle.vue'
import LeadersCircle from '../components/LeadersCircle.vue'
import Teams from '../components/Teams/Teams.vue'
import NationsCup from '../components/NationsCup.vue'
import Schedule from '../components/Schedule.vue'
import Frequencies from '../components/Frequencies.vue'
import Ladder from '../components/Ladder.vue'
import Photos from '../components/Photos/Photos.vue'

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
        path: '/teams',
        name: 'Teams',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Teams
      },
      {
        path: '/nations',
        name: 'Nations Cup',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: NationsCup
      },
      {
        path: '/schedule',
        name: 'Schedule',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Schedule
      },
      {
        path: '/frequencies',
        name: 'Frequencies',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Frequencies
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
        path: '/photos',
        name: 'Photos',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Photos
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
        path: '/ladder',
        name: 'Ladder',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Ladder
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
