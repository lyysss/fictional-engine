<template>
    <div class="goods-list">
        <router-link :to="'/store/goodsItem/' + item.id" class="goods-item" v-for="item in goodslist" :key="item.id" tag="div">
            <img :src="item.img_url">
            <h3>{{ item.title }}</h3>
            <div class="goods-explain">
                <div class="goods-price">
                    <span class="now">¥ 1 (吐血跳楼价)</span>
                    <span class="old">{{ item.market_price }}元</span>
                </div>
                <div class="text">
                    <span>{{ nowtime }}</span>
                    <span class="text-right">缺货+</span>
                </div>
            </div>
        </router-link>
        <van-button  plain hairline  type="primary" size="large" @click="getGoodsMore">点我加载更多...</van-button>
    </div>

</template>

<script>
    export default {
        data(){
            return {
                page:1,
                goodslist: [],
                nowtime:""
            }
        },
        created(){
            this.getGoodsList();
            let dt= new Date();
            this.nowtime = dt.getMonth()+1+"月"+(dt.getDate()+1)+"号0点开抢!!!"
        },
        methods:{
            getGoodsList(){
                this.$http.get("api/getgoods?"+this.page).then(result =>{
                    if(result.body.status === 0){
                        this.goodslist = this.goodslist.concat(result.body.message);
                    }else{
                        this.mounted();
                    }
                })
            },
            getGoodsMore(){
                this.page++;
                this.getGoodsList();
            },
        },
    }
</script>

<style scoped lang="less">
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 5px;
        justify-content: space-between;

        .goods-item{
            width: 48%;
            padding: 2px;
            border: 1px solid #ccc;
            box-shadow: 0 0 7px #ccc;
            margin: 4px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img{
                width: 100%;
            }
            h3{
                font-size: 14px;
                margin: 0;
                padding: 0 2px;
            }
            .goods-explain{
                background-color: #eee;
                div{
                    padding: 5px;
                }
                .goods-price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 14px;

                    }
                    .old{
                        margin-left: 20px;
                        text-decoration: line-through;
                        font-size: 13px;
                    }
                }
                .text{
                    font-size: 12px;
                    display: flex;
                    justify-content: space-between;
                    .text-right{
                        color: darkred;
                        font-size: 13px;
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>