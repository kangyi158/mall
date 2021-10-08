import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = () => import('views/home/Home')
const Detail = () => import('views/detail/Detail')
const Categary = () => import('views/categary/Categary')
const Profile = () => import('views/profile/Profile')
const Shopcart = () => import('views/shopcart/Shopcart')
const routes = [

    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/categary', component: Categary },
    { path: '/profile', component: Profile },
    { path: '/shopcart', component: Shopcart },
    { path: '/detail/:id', component: Detail },

]
export default new Router({
    routes,
    mode: 'history'
})