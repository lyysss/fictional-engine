<template>
    <div>
        <van-tabs @click="onClick">
            <van-tab v-for="item in photoTitles" :key="item.id" :title="item.title">
                <ul class="photosStyle">
                    <router-link :to="'/home/photo/photoInfo/'+ item.id" v-for="item in photos" :key="item.id" tag="li">
                        <img v-lazy="item.img_url">
                        <div class="photosStyleText">
                            <h3 class="title">{{item.title}}</h3>
                            <span class="body">{{item.zhaiyao}}</span>
                        </div>
                    </router-link>
                </ul>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                photoTitles : [],
                photos:[],
                idddddd:0,
            };
        },
        created(){
            this.getPhotoList();
            //打开默认展示全部图片
            this.getPhotos(0);
        },
        methods:{
            getPhotoList(){
                this.$http.get('api/getimgcategory').then(result=>{
                    if(result.body.status === 0){
                        result.body.message.unshift({title:'全部',id:0});
                        this.photoTitles = result.body.message;
                    }else{
                        this.mounted()
                    }
                })
            },
            onClick(name) {
                //vant坑一个.标签页van-tab 这个绑定事件没什么用.因为它下面还有一个默认自带标签
                //span   .  绑定事件触发不了. 而且.我想利用冒泡事件来做.但是找不到思路.不熟悉.
                //找了半天. vant 这个标签页提供一个onClick默认事件. 我发现可以获取到当前title
                //的下标, 在结合photoTitles 标题数组就能定位到我当前点的哪个子页面. 然后在获取到
                //它的真实ID值.  然后在次发起请求 ,单独请求它子页面的数据!!!
                //肯定有更好的办法. 我这个太垃圾了.  日后来补坑.
                this.idddddd = this.photoTitles[name].id;
                this.getPhotos(this.idddddd);
            },
            getPhotos(id){
                this.$http.get('api/getimages/'+id).then(result=>{
                    if(result.body.status === 0){
                        this.photos = result.body.message;
                    }else{
                        this.mounted()
                    }
                })
            },

            mounted() {
                this.$toast('加载数据失败...');
            },
        }
    }
</script>

<style scoped lang="less">
    *{
        padding: 0;
        margin: 0;
    }
    .photosStyle{
        padding: 10px;
        color: #fff;
        li{
            margin-bottom: 10px;
            position: relative;
        }
        img{
            width: 100%;
            vertical-align: middle;
        }
        .photosStyleText{
            padding: 0 5px;
            position: absolute;
            background-color: rgba(0,0,0,0.4);
            bottom: 0px;
            max-height: 84px;
            .title{
                font-size: 14px;
            }
            .body{
                font-size: 13px;
            }
        }
    }
</style>