<template>
    <div>
        <van-tabs @click="onClick">
            <van-tab v-for="item in photoTitles" :key="item.id" :title="item.title">
                <lazy-component>
                    <img v-for="item in photos" :key="item.id" v-lazy="item.img_url">
                </lazy-component>
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
                console.log("test");
                this.$http.get('api/getimages/'+id).then(result=>{
                    if(result.body.status === 0){
                        console.log('ok');
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

<style scoped>

</style>