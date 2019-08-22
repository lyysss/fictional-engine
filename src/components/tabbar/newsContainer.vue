<template>
    <div>
        <ul class="newsComment">
            <router-link :to="'/news/newsInfo/' + item.id" v-for="item in newslist" :key="item.id">
                <img :src="item.img_url">
                <li>
                    <h4>{{item.title}}</h4>
                    <div class="timeClick">
                        <span>发表时间:{{item.add_time | dateFormat('YYYY-MM-DD') }}</span>
                        <span>点击:{{item.click}}次</span>
                    </div>
                </li>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        //http://www.liulongbin.top:3005/api/getnew/:newid
        name: "user",
        data(){
            return{
                newslist :[

                ]
            }
        },
        created(){
          this.getNewsList();
        },
        methods:{
            getNewsList(){
                this.$http.get('api/getnewslist').then(result =>{
                    if(result.body.status === 0){
                        this.newslist = result.body.message;
                    }else{
                        this.$toast('加载数据失败...');
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
.newsComment{
    margin-top: 10px;
    a{
        padding: 10px 10px 5px;
        height: 90px;
        display: flex;
        color: #000;
        flex-direction: row;
        border-bottom: 1px solid #ccc;
        img{
            height: 80px;
            width: 80px;
            margin-right: 15px;
        }
        li{
            width: 100%;
            h4{
                font-size: 14px;
            }
            div{
                display: flex;
                font-size: 12px;
                justify-content: space-between;
            }
        }
    }

}
</style>