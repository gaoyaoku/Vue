import VueRouter from 'vue-router'

import Home from '../pages/Home'
import Completed from '@/pages/Completed'
import Me from "@/pages/Me";

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'home',
            path: '/home',
            component: Home,
            meta: {
                title: '主页'
            }
        },
        {
            name: 'completed',
            path: '/completed',
            component: Completed,
            meta: {
                title: '已完成'
            }
        },
        {
            name: 'me',
            path: '/me',
            component: Me,
            meta: {
                title: '我的'
            }
        }

    ]
})

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
    document.title = to.meta.title || '待办'
})

export default router