<template>
    <div class="shoppingCar">
        <van-card v-for="item in goodsList" :key="item.id"
                :num="$store.getters.getGoodsCount[item.id]"
                :price="item.sell_price"
                desc="严重缺货,抢到请尽快下单"
                :title="item.title"
                :thumb="item.thumb_path"
        >
            <div slot="footer">
                <van-button size="mini" @click="goodsDelete(item.id,$store.getters.getGoodsCount[item.id])"> 删除 </van-button>
                <van-button size="mini" @click="goodsIncrease(item.id)" > +1 </van-button>
            </div>
        </van-card>

        <van-submit-bar
                :price="this.$store.state.sum"
                button-text="提交订单"
                @submit="onSubmit"
        />
    </div>
</template>

<script>
    import { Dialog } from 'vant';

    export default {
        name: "shoppingCar",
        data() {
            return {
                goodsList : [],
                sum : 0
            }
        },
        created(){
            this.getGoodsList();
            this.getCountprice();
        },
        methods:{
            goodsDelete(id){
                this.$store.commit('GoodsDelete',id);
                this.$store.commit('getCountprice');
            },
            goodsIncrease(id){
                this.$store.commit('GoodsIncrease',id);
                this.$store.commit('getCountprice');
            },
            getGoodsList(){
                var idArr = [];
                this.$store.state.goodsCar.forEach(item=> idArr.push(item.id));
                if(idArr.length <= 0){
                    return;
                }
                this.$http.get('api/goods/getshopcarlist/'+ idArr.join(',')).then(result=>{
                    if(result.body.status === 0){
                        this.goodsList = result.body.message;
                    }else{
                        this.mounted()
                    }
                });
            },
            onSubmit(){
                Dialog({ message: '订单提交成功，请耐心等待。'});
                localStorage.clear('car');
            }
        }
    }
</script>

<style scoped lang="less">
    .shoppingCar{
        background-color: #eee;
        overflow: hidden;
        padding-top: 15px;
        .van-submit-bar{
            position: relative;
            margin-top: 20px;
            z-index: 1;
        }
        .van-card__content{
            div{
                margin: 3px 0;
            }
        }
        .van-button--default{
            color: red;
        }
    }
</style>