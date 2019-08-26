<template>
    <div class="Content">
        <!--导航栏-->
        <van-nav-bar title="Vant + Vue" fixed class="header"/>

        <!--中间的路由 rouder-view 区-->
        <transition>
            <router-view></router-view>
        </transition>


        <van-tabbar route active-color="#07c160" inactive-color="#000" fixed>
            <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/news" icon="contact">新闻评论</van-tabbar-item>
            <van-tabbar-item replace to="/shoppingCar" icon="shopping-cart-o" id="badge" :info="this.$store.state.count">购物车</van-tabbar-item>
            <van-tabbar-item replace to="/store" icon="gift-o">Store</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {

    }

</script>

<style scoped>
    /*单页面根*/
    .Content{
        padding-top: 40px;
        padding-bottom: 50px;
        overflow: hidden;
    }

    /*全局导航栏*/
    .header{
        background-color: darkcyan;
        font-weight: bold;
    }
    .van-nav-bar__title{
        color: #fff;
    }
    .v-enter {opacity:0 ; transform: translateX(100%) }
    .v-leave-to { opacity:0 ; transform: translateX(-100%)}
    .v-enter-active, .v-leave-active { transition: all 0.4s ease }
</style>