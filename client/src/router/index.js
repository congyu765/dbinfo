import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { Notification } from 'element-ui'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: {
      name: 'movie-list'
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/user/register',
    name: 'register',
    alias: '/register',
    component: () => import('../views/user/register.vue')
  },
  {
    path: '/user/login',
    name: 'login',
    alias: '/login',
    component: () => import('../views/user/login.vue')
  },
  {
    path: '/movie',
    component: () => import('../views/layout/Movie.vue'),
    children: [
      {
        path: 'create',
        name: 'movie-create',
        component: () => import('../views/movie/Create.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'list',
        name: 'movie-list',
        component: () => import('../views/movie/List.vue')
      },
      {
        path: 'detail/:id',
        name: 'movie-detail',
        component: () => import('../views/movie/Detail.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: {
      name: 'movie-list'
    }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((router) => router.meta.auth)) {
    if (store.state.isUserLogin) {
      next()
    } else {
      Notification({
        title: '提示',
        type: 'warning',
        message: '请登录后再访问该页面'
      })
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
  next()
})
export default router
