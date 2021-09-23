import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = () => import('views/home/Home')
const Categary = () => import('views/categary/Categary')
const Profile = () => import('views/profile/Profile')
const Shopcart = () => import('views/shopcart/Shopcart')
const routes = [

    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/categary', component: Categary },
    { path: '/profile', component: Profile },
    { path: '/shopcart', component: Shopcart },

]
export default new Router({
    routes,
    mode: 'history'
})