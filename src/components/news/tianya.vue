<template>
    <div class="newsContent">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566393154840&di=d864d76463919e1a2ddd1edf6e7fcf6e&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_jpg%2FQicyPhNHD5vYvA1K6B56QuYaY0QibQybNYkJElcWK5aeicYkYOwCOeLs5QogGa3ANne21Ze5GfptYicAU2DurnJuDQ%2F640%3Fwx_fmt%3Djpeg" alt="">
        <p>Hot 热度排行榜</p>
        <span></span>
        <a :href="item.url" v-for="(item,i) in data" :key="item.id">{{i+1}} . {{item.title}}</a>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                data : []
            };
        },
        created(){
            this.zhihudata();
        },
        methods:{
            zhihudata(){
                this.$http.get('https://www.printf520.com:8080/GetTypeInfo?id=6').then(result=>{
                    if(result.body.Code === 0){
                        this.data = result.body.Data;
                    }else{
                        alert('获取数据失败...')
                    }
                })
            },

        }
    }
</script>

<style scoped>
    .newsContent{
        padding: 5px;
    }
    .newsContent span{
        display: block;
        width: 100%;
        height: 1px;
        background-color: #3388ff;
        margin-bottom: 20px;
    }
    .newsContent img {
        width: 80px;
        height: 50px;
        margin-top: 10px;
        margin-left: 30px;
        margin-right: 10px;
        float: left;
    }
    .newsContent a{
        display: block;
        color: #000;
        padding: 10px 5px;
        border-bottom: 1px solid #3388ff;
    }
    .newsContent p {
        transform: translateY(13px);
        color: red;
    }
</style>