// 入口文件
import Vue from 'vue';

// 导入 App根组件
import app from './app.vue'

//标签页.vant导航.轮播图. 导入成功后注册
import {SubmitBar,Tabbar,TabbarItem,NavBar,Swipe,SwipeItem,Grid,GridItem,Field,Button,Toast,Tab,Tabs,Lazyload,Stepper,Card} from 'vant';
Vue.use(SubmitBar).use(Tabbar).use(TabbarItem).use(NavBar).use(Swipe).use(SwipeItem).use(Grid).use(GridItem).use(Field).use(Button).use(Toast).use(Tab).use(Tabs).use(Lazyload).use(Stepper).use(Card);

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

//导入vuex
import Vuex from 'vuex';
Vue.use(Vuex)

//导入vant dialog弹出确认框.
import { Dialog } from 'vant';

var goodsCar = JSON.parse(localStorage.getItem('car')||'[]')

var store = new Vuex.Store({
    state:{
        goodsCar:goodsCar,
        sum:0
    },
    mutations:{
        getCountprice(state){
            state.sum = 0;
            state.goodsCar.forEach(item=>{
                state.sum += item.count * item.nowprice
            });
            state.sum*=100
        },
        increment(state,valueArr){  //value是调用这个方法的函数传递过来的值。
            var flag = false;
            state.goodsCar.some(item=>{
                if(item.id == valueArr.id){
                    item.count += parseInt(valueArr.count);
                    flag=true;
                    return true
                }
            });
            if(!flag){
                state.goodsCar.push(valueArr)
            }
            localStorage.setItem('car',JSON.stringify(state.goodsCar))
        },
        GoodsIncrease(state,id){
            state.goodsCar.some(item=>{
                if(item.id == id){
                    item.count +=1;
                    return true
                }
            })
            localStorage.setItem('car',JSON.stringify(state.goodsCar))
        },
        GoodsDelete(state,id){
            state.goodsCar.some(item=>{
                if(item.id == id){
                    if(item.count == 1){
                        Dialog.confirm({
                            title: '商品',
                            message: '确认删除此商品吗?'
                        }).then(() => {
                            item.count -=1;
                            return
                        }).catch(() => {
                            item.count +=1;
                            return
                        });
                    }
                    item.count -=1;
                }
            });
            localStorage.setItem('car',JSON.stringify(state.goodsCar))
        }
    },
    getters:{
        getAllCount(state){
            let c = 0;
            state.goodsCar.forEach(item=>{
                c+=item.count;
            });
            return c
        },
        getGoodsCount(state){
            var o ={};
                state.goodsCar.forEach(item=>{
                    o[item.id] = item.count
            });
            return o
        },
    }
});

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store : store
});

