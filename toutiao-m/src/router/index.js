import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [


        {
            path:'/login',
            name:'login',
            component:()=>import('@/views/login')
        },
        {
            path:"/layout",
            name:'layout',
            component:()=>import('@/Layout'),
            children:[
                {
                    path:'/layout/home',
                    name:'home',
                    component:()=>import('@/Layout/home')
                },
                {
                    path:'/layout/user',
                    name:'user',
                    component:()=>import('@/Layout/user')
                }
            ]

        },
        {
            path:"/",
            redirect:'/layout/home'
        },

    ]

})

export default router