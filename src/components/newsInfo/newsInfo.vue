<template>
    <div class="listInfoContaier">
        <h3>{{newsdata.title}}</h3>
        <div class="listInfoTime">
            <span>发表时间:{{newsdata.add_time | dateFormat('YYYY-MM-DD') }}</span>
            <span>阅读量:{{newsdata.click}}</span>
        </div>
        <hr>
        <div v-html="newsdata.content" class="listInfoText"></div>

        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
    import comment from '../subComments/comment.vue'
    export default {
        data(){
            return{
                id: this.$route.params.id,
                newsdata:{},
            }
        },
        created(){
            this.getNews()
        },
        methods:{
            getNews(){
                this.$http.get('api/getnew/'+ this.id).then(result =>{
                    if(result.body.status === 0){
                        this.newsdata = result.body.message[0];
                    }else{
                        this.mounted();
                    }
                })
            },
            mounted() {
                this.$toast('加载数据失败...');
            },
        },
        components:{
            "comment-box":comment
        }
    }
</script>

<style scoped lang="less">
    .listInfoContaier{
        padding: 5px;
        h3{
            color: red;
            font-size: 16px;
            text-align: center;
            line-height: 30px;
        }
        .listInfoTime{
            display: flex;
            justify-content: space-between;
            span{
                color: dodgerblue;
            }
        }
        hr{
            background-color: darkgray;
            margin-bottom: 20px;
        }
        .listInfoText{
            :first-child{
                text-indent:2em;
            }
        }
    }
</style>