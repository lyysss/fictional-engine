<template>
        <div>
            <van-swipe :autoplay="3000" indicator-color="white" class="van-swipe__track">
                <van-swipe-item v-for="item in lunbotuList" :key="item.img">
                    <img :src="item.img">
                </van-swipe-item>
            </van-swipe>

            <van-grid :column-num="3">
                <van-grid-item icon="fire" to="/home/news" text="知乎"/>
                <van-grid-item icon="other-pay" to="/home/hupu" text="虎扑"/>
                <van-grid-item icon="balance-list-o" to="/home/v2ex" text="V2EX"/>
                <van-grid-item icon="question-o" to="/home/weibo" text="微博"/>
                <van-grid-item icon="video-o" to="/home/bilibili" text="bilibili"/>
                <van-grid-item icon="chat-o" to="/home/weixin" text="微信热点"/>
                <van-grid-item icon="new-o" to="/home/shuimu" text="Github"/>
                <van-grid-item icon="logistics" to="/home/tianya" text="天涯社区"/>
                <van-grid-item icon="comment-o" to="/home/wangyi" text="网易新闻"/>

                <router-link to="/home/photo"><img class="FastFurious" style="opacity: 0.6" src="http://5b0988e595225.cdn.sohucs.com/images/20190517/afd7458522e3465b90492346214532c8.jpeg"></router-link>

            </van-grid>
        </div>
</template>

<script>
    export default {
        data(){
            return {
                lunbotuList : []
            };
        },
        created(){
          this.getLunbotu();
        },
        methods:{
            getLunbotu(){
                this.$http.get('api/getLunbo').then(result=>{
                    if(result.body.status === 0){
                        this.lunbotuList = result.body.message;
                    }else{
                        this.mounted();
                    }
                })
            },
            mounted() {
                this.$toast('加载数据失败...');
            },
        }
    }
</script>

<style scoped>
    .van-swipe__track{
        height: 200px;
        margin-top: 6px;
    }
    img{
        width: 100%;
        height: 100%;
    }
    .FastFurious{
        margin-top: 30px;
    }
</style>