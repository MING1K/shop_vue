
// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
// component: () => import('@/pages/Home'),

export default [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/Home'),
        meta: { footershow: true },
    },
    {
        path: '/search/:keyword?',
        name: 'search',
        component: () => import('@/pages/Search'),
        meta: { footershow: true },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/Login'),
        meta: { footershow: false },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/Register'),
        meta: { footershow: false },
    },
    {
        path: '/detail/:skuid',
        name: 'detail',
        component: () => import('@/pages/Detail'),
        meta: { footershow: true },
    },
    {
        path: '/addcardsuccess',
        name: 'addcardsuccess',
        component: () => import('@/pages/addCardSuccess'),
        meta: { footershow: true },
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: () => import('@/pages/shopCart'),
        meta: { footershow: true },
    },
    {
        path: '/trade',
        name: 'trade',
        component: () => import('@/pages/Trade'),
        meta: { footershow: true },
        beforeEnter: (to, from, next) => {
            if (from.path === '/shopcart') {
                next();
            } else {
                // 其他组件跳转停留在当前组件
                next('/home');
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: () => import('@/pages/Pay'),
        meta: { footershow: true },
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade' || from.path === '/center/myorder') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: { footershow: true },
        beforeEnter: (to, from, next) => {
            if (from.path === '/pay') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/center',
        name: 'center',
        component: () => import('@/pages/Center'),
        meta: { footershow: true },
        children: [
            {
                path: 'myorder',
                name: 'myorder',
                component: () => import('@/pages/Center/MyOrder'),
                meta: { footershow: true },
            },
            {
                path: 'teamorder',
                name: 'teamorder',
                component: () => import('@/pages/Center/TeamOrder'),
                meta: { footershow: true },
            },
            {
                path: '/',
                redirect: 'myorder'
            }
        ]
    },
    {
        path: '/communication',
        name: 'communication',
        component: () => import('@/pages/Communication/Communication.vue'),
        meta: { footershow: true },
        children: [
            {
                path: 'eventtest',
                name: 'eventtest',
                component: () => import('@/pages/Communication/components/EventTest.vue'),
            },
            {
                path: 'vmodel',
                name: 'vmodel',
                component: () => import('@/pages/Communication/components/ModelTest.vue'),
            },
            {
                path: 'sync',
                name: 'sync',
                component: () => import('@/pages/Communication/components/SyncTest.vue'),
            },
            {
                path: 'attrslisteners',
                name: 'attrslisteners',
                component: () => import('@/pages/Communication/components/AttrsListenersTest.vue'),
            },
            {
                path: 'childrenandparent',
                name: 'childrenandparent',
                component: () => import('@/pages/Communication/components/ChildrenAndParent.vue'),
            },
            {
                path: 'slot',
                name: 'slot',
                component: () => import('@/pages/Communication/components/ScopeSlotTest/ScopeSlotTest.vue'),
            },
            {
                path: '/',
                redirect: 'eventtest'
            }
        ]
    },
    {
        // 重定向：在项目跑起来的时候，访问/，立马让他定向到首页
        path: '/',
        redirect: '/home'
    }
]