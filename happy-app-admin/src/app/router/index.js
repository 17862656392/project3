//vue项目路由配置文件
import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home.vue';
import Category from '../views/Category.vue';
import List from '../views/List.vue';
import Detail from '../views/Detail.vue';
import Video from '../views/Video.vue';
import Cart from '../views/Cart.vue';
import Profile from '../views/Profile.vue';
import Login from '../views/Login.vue';
import Order from '../views/Order.vue';
import OrderDetail from '../views/OrderDetail.vue';
import Address from '../views/Address.vue';
import Addaddress from '../views/Addaddress.vue';


Vue.use(Router);

//创建路由对象并导出路由对象
export default new Router({
        linkActiveClass: 'active',
        routes: [
                { path: '/', component: Home },
                {
                        path: '/category',
                        component: Category,
                        meta: { keepAlive: true } // meta藏与路由相关的值
                },
                {
                        path: '/list/:mainId/:subId',
                        component: List,
                        meta: { keepAlive: true }
                },
                { path: '/detail', component: Detail },
                { path: '/video', component: Video },
                { path: '/cart', component: Cart },
                { path: '/order', component: Order },
                { path: '/orderdetail/:orderId', name: 'OrderDetail', component: OrderDetail },
                { path: '/profile', component: Profile },
                { path: '/login', component: Login },
                { path: '/address', component: Address },
                { path: '/add', component: Addaddress }
        ]
});