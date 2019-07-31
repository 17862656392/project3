// vue开发页面的根实例
import Vue from 'vue';//导入vue
import VDistpicker from 'v-distpicker';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';//导入路由
import store from './store'; //导入仓库对象
import App from './App.vue';//导入根组件
import './assets/css/reset.css';//导入快乐购的专有样式
import './assets/css/swiper.css'//导入swiper
import http from './utils/http.js';

Vue.use(VDistpicker);
Vue.prototype.$http = http; //自己扩展的属性加$符号
//创建vue根实例，将根组件App.vue渲染到挂载点#app
let vm = new Vue({
        el: '#app',
        router,
        store,
        components: { App },  //注册根组件
        template: '<App></App>' //模板
});
