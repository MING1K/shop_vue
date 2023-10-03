import Vue from 'vue';
// import Cookies from 'js-cookie';

// element
// import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(Element, {size: 'small',}); //large //medium / small / mini
// Vue.use(Element, {
//   size: Cookies.get('size') || 'small', //large //medium / small / mini
// });
import {
    Message,
    MessageBox,
    Button,
} from 'element-ui';
Vue.use(Button);

// ElementUI注册组件可以挂在原型上
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$msgbox = MessageBox;

// 图片懒加载
import VueLazyload from 'vue-lazyload';
import loadingImg from '@/assets/loading.webp';
Vue.use(VueLazyload, {
    loading: loadingImg, // 懒加载默认的图片
})

import Carousel from '@/components/Carousel';
import TypeNav from '@/components/TypeNav';
import Pagination from '@/components/Pagination';
// import Qrcode from '@/components/Qrcode';
// 第一个参数：全局组件的名字；第二个参数：哪一个组件
Vue.component(Carousel.name, Carousel);
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);
// Vue.component(Qrcode.name, Qrcode);

// 引入swiper样式
import 'swiper/css/swiper.css';

// 表单验证
import '@/plugins/validate';
