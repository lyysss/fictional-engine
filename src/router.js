import VueRouter from 'vue-router'
import homeContainer from './components/tabbar/homeContainer.vue'
import newsContainer from './components/tabbar/newsContainer.vue'
import shoppingCarContainer from './components/tabbar/shoppingCarContainer.vue'
import store from './components/tabbar/store.vue'
import newsList from './components/news/newsList.vue'
import hupu from './components/news/hupu.vue'
import v2ex from './components/news/v2ex.vue'
import weibo from './components/news/weibo.vue'
import bilibili from './components/news/bilibili.vue'
import weixin from './components/news/weixin.vue'
import shuimu from './components/news/shuimu.vue'
import tianya from './components/news/tianya.vue'
import wangyi from './components/news/wangyi.vue'
import newsInfo from './components/newsInfo/newsInfo.vue'
import photoList from './components/photos/photolist.vue'
import photoInfo from './components/photos/photoInfo.vue'
import goodsItem from './components/goodsItem/goodsItem.vue'
import goodsDetailed from "./components/goodsItem/goodsDetailed.vue";
import goodsComent from "./components/goodsItem/goodsComment.vue";

var router = new VueRouter({
    routes: [
        {path: '/', component: homeContainer},
        {path: '/home', component: homeContainer},
        {path: '/news', component: newsContainer},
        {path: '/shoppingCar', component: shoppingCarContainer},
        {path: '/store', component: store},
        {path: '/home/news', component: newsList},
        {path: '/home/hupu', component: hupu},
        {path: '/home/v2ex', component: v2ex},
        {path: '/home/weibo', component: weibo},
        {path: '/home/bilibili', component: bilibili},
        {path: '/home/weixin', component: weixin},
        {path: '/home/shuimu', component: shuimu},
        {path: '/home/tianya', component: tianya},
        {path: '/home/wangyi', component: wangyi},
        {path: '/news/newsInfo/:id', component: newsInfo},
        {path: '/home/photo', component: photoList},
        {path: '/home/photo/photoInfo/:id', component: photoInfo},
        {path: '/store/goodsItem/:id', component: goodsItem},
        {path: '/store/goodsComment/:id', component: goodsComent , name:"goodsComent"},
        {path: '/store/goodsDetailed/:id', component: goodsDetailed, name:"goodsDetailed"},
    ]
})

export default router