import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
//引入仓库
import store from '@/store'

// 使用插件
Vue.use(VueRouter)

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数：告诉原来的push方法，你往哪里跳转（传递那些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    // console.log(this);
    if (resolve && reject) {
        // call|apply区别
        // 相同点：都可以使用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    }
    else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    // console.log(this);
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    }
    else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


// 配置路由
let router = new VueRouter({
    // 配置路由
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        // 滚动条在最上方
        return { y: 0 };
    }
})

//全局守卫:只要项目中有任何路由变化，全局守卫都会进行拦截【符合条件走你，不符合条件不能访问】
//全局守卫:全局前置守卫【访问之前进行触发】

//全局前置守卫
router.beforeEach(async (to, from, next) => {
    //to:去的那个路由的信息
    //from:从那个路由而来的信息
    //next:放行函数!!!!!! 
    //第一种：next(),放行函数，放行到它想去的路由！！！
    //第二种:next(path),守卫指定放行到那个路由去?

    //用户是否登录:取决于仓库里面是否有token！！！
    //每一次路由跳转之前需要用有用户信息在跳转,没有发请求获取用户信息在跳转！！！！
    //token
    let hasToken = store.state.user.token;
    //用户信息
    let hasUserName = store.state.user.userInfo.nickName || null;
    console.log(hasUserName, store.state.user)
    //用户登录
    if (hasToken) {
        //用户已登录
        if (to.path == "/login") {
            next('/home');
        } else {
            //用户登陆了,而且还有用户信息【去的并非是login】
            if (hasUserName) {
                next();
            } else {
                //用户登陆了,但是没有用户信息 
                try {
                    //发请求获取用户信息以后在放行
                    await store.dispatch('user/getUserInfo');
                    next();
                } catch (error) {
                    //用户没有信息，还携带token发请求获取用户信息【失败】
                    //token【学生证失效了】
                    //token失效:本地清空数据、服务器的token通知服务器清除
                    await store.dispatch('user/userLogout');
                    //回到登录页，重新获取一个新的学生证
                    next('/login');
                }
            }
        }
    } else {
        //用户未登录||目前的判断都是放行.将来这里会'回手掏'增加一些判断
        // next();
        //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
        let toPath = to.path;
        if (toPath.indexOf('trade') !== -1 || toPath.indexOf('pay') !== -1 || toPath.indexOf('center') !== -1) {
            next('/login?redirect='+toPath);
        } else {
            next();
        }
    }
});



export default router;
