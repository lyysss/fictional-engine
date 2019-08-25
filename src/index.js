// 入口文件
import Vue from 'vue';

// 导入 App根组件
import app from './app.vue'

//标签页.vant导航.轮播图. 导入成功后注册
import { Tabbar, TabbarItem,NavBar,Swipe,SwipeItem,Grid,GridItem,Field,Button,Toast,Tab,Tabs,Lazyload,ImagePreview} from 'vant';
Vue.use(Tabbar).use(TabbarItem).use(NavBar).use(Swipe).use(SwipeItem).use(Grid).use(GridItem).use(Field).use(Button).use(Toast).use(Tab).use(Tabs).use(Lazyload).use(ImagePreview);


//导入路由模板
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import moment from 'moment'  //导入时间插件 node.js
//定义全局的时间过滤器
Vue.filter('dateFormat',function(dataStr,pattern='YY-MM-DD HH-MM-SS'){
    return moment(dataStr).format(pattern)
})


//导入vue-resource 模板
import VueResource from 'vue-resource'
Vue.use(VueResource);

Vue.http.options.root = 'http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON = true;
//导入组件
import router from  './router.js'

//安装缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})

