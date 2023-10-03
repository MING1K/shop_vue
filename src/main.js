import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入仓库
import store from './store'
Vue.config.productionTip = false

import './plugins/index.js';

// 引入mockServer.js----mock数据
import '@/mock/mockServer';

// 统一接口api文件夹里面全部请求参数 同一引入
import * as API from '@/api';

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由（router的r小写）
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库:组件实例的身上会多一个属性，$store属性
  store
}).$mount('#app')
