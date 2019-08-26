<template>
    <div class="detailedData">
        <h3> {{ detailedData.title }} </h3>
        <hr>
        <div v-html="detailedData.content" class="content"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                id: this.$route.params.id,
                detailedData : []
            }
        },
        created(){
            this.getDetailedData();
        },
        methods:{
            getDetailedData(){   //获取商品详情轮播图
                this.$http.get("api/goods/getdesc/"+this.id).then(result =>{
                    if(result.body.status === 0){
                        this.detailedData = result.body.message[0];
                    }
                })
            },
        }
    }
</script>

<style lang="less">
  .detailedData{
      width: 100%;
      padding: 5px;
      h3 {
          font-size: 16px;
          color: #226aff;
          text-align: center;
          margin: 15px 0;
      }
      .content{
          width: 100%;
          img{
              width: 100%;
              height: 100%;
          }
      }
  }
</style>