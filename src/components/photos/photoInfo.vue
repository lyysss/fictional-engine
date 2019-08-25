<template>
    <div class="listInfoContaier">
        <h3>{{photoContent.title}}</h3>
        <div class="listInfoTime">
            <span>发表时间 : {{photoContent.add_time| dateFormat('YYYY-MM-DD') }}</span>
            <span>阅读 : {{photoContent.click}} 次</span>
        </div>
        <hr>
        <div class="imgs">
            <img :src="item.src" v-for="item in suoluetu" :key="item.index" @click="normalImg">
        </div>
        <p v-html="photoContent.content"></p>
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
    import comment from '../subComments/comment.vue'
    export default {
        data(){
            return{
                id: this.$route.params.id,
                photoContent: {},
                suoluetu : []
            }
        },
        created(){
            this.getPhtotInfo();
            this.getSuoluetu();
        },
        methods:{
            getPhtotInfo(){
                this.$http.get('api/getimageInfo/'+ this.id).then(result =>{
                    if(result.body.status === 0){
                        this.photoContent = result.body.message[0];
                    }else{
                        this.mounted();
                    }
                })
            },
            getSuoluetu(){
              this.$http.get('api/getthumimages/'+this.id).then(result =>{
                  if(result.body.status ===0){
                      result.body.message.forEach(item=>{
                          item.w = 60;
                          item.h = 40;
                      });
                      this.suoluetu = result.body.message;
                  }
              })
            },
            normalImg(){
                console.log("ok");
              return this.suoluetu.src;
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
            line-height: 25px;
           font-size: 14px;
            strong{
                font-size: 16px;
            }
        }
        p{
            line-height: 25px;
            font-size: 14px;
        }
        .imgs {
            display: flex;
            width: 100%;
            flex-flow: row wrap;
            align-content: flex-start;
            img{
                flex: 1;
                width: 33.3%;
                height: 100%;
                margin: 3px;
            }
        }

    }
</style>