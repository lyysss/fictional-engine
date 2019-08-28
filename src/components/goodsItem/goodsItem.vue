<template>
    <div class="goods-Item">
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="redball" v-show="flag" ref="ball"></div>
        </transition>
        <div class="titile">
            <van-swipe :autoplay="3000" indicator-color="white" class="van-swipe__track">
                <van-swipe-item v-for="item in lunbotu" :key="item.img">
                    <img :src="item.src">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="bodyItem">
            <h3>{{ goodsItemData.title }}</h3>
            <hr>
            <p class="price">市场价：
                <del>￥{{ goodsItemData.market_price }}</del> &nbsp;&nbsp;&nbsp;销售价：<span class="now">￥{{ goodsItemData.sell_price }}</span>
            </p>
            <div class="number">
                <span>购买数量：</span>
                <van-stepper v-model="value"/>
            </div>
            <van-button type="primary">立即购买</van-button>
            <van-button type="info" @click="addShoppingCart">加入购物车</van-button>
        </div>
        <div class="floot">
            <h3>商品参数</h3>
            <hr>
            <p>商品编码号: {{ goodsItemData.goods_no }}</p>
            <p>库存情况: {{ goodsItemData.stock_quantity }}</p>
            <p>上架时间: {{ goodsItemData.add_time }}</p>

        </div>
        <van-button type="primary" size="large" plain @click="goDetail(id)">商品详情</van-button>
        <van-button type="info" size="large" plain @click="goComment(id)">商品评论</van-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id,
                value: 1,
                goodsItemData: {},
                lunbotu: [],
                flag: false,
            }
        },
        created() {
            this.getgoodsItemData();
            this.getgoodsItemIntroduction();
        },
        methods: {
            getgoodsItemData() {   //获取商品详情轮播图
                this.$http.get("api/getthumimages/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.lunbotu = result.body.message;
                    }
                })
            },
            getgoodsItemIntroduction() {
                this.$http.get("api/goods/getinfo/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.goodsItemData = result.body.message[0];
                    }
                })
            },
            goDetail(id) {  //编程式导航组件
                this.$router.push({name: "goodsDetailed", params: {id}});
            },
            goComment(id) {
                this.$router.push({name: "goodsComent", params: {id}});
            },
            addShoppingCart() {
                this.flag = !this.flag;
                let goodsArr = {
                    id: this.id,
                    nowprice: this.goodsItemData.sell_price,
                    count: this.value,
                    selected: true,
                };
                this.$store.commit('increment', goodsArr);
            },
            beforeEnter(el) {
                el.style.transform = "translate(0px,0px)";
            },
            enter(el, done) {
                el.offsetWidth;
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                const badgePosition = document
                    .getElementById("badge")
                    .getBoundingClientRect();
                const xDist = badgePosition.left+45 - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                el.style.transform = `translate(${xDist}px, ${yDist}px)`;
                    el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
                done();
            },
            afterEnter(el) {
                this.flag = !this.flag;
            },
        }
    }
</script>

<style scoped lang="less">
    * {
        margin: 0;
        padding: 0;
    }

    .goods-Item {
        background-color: #ddd;
        width: 100%;
        overflow: hidden;

        > .van-button {
            width: 95%;
            margin: 5px 10px;
        }

        .redball {
            width: 8px;
            height: 8px;
            background-color: red;
            position: absolute;
            border-radius: 50%;
            top: 431px;
            left: 126px;
            z-index: 99;
        }

        > div {
            width: 95%;
            margin: 10px auto;
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 0 7px #ccc;
            padding: 5px;
            border-radius: 5px;
        }

        .titile {
            height: 200px;
            text-align: center;

            img {
                height: 100%;
            }
        }

        .bodyItem {
            h3 {
                font-size: 18px;
                line-height: 40px;
                margin-left: 10px;
                margin-bottom: 10px;
            }

            .price {
                margin: 25px 10px;
                font-size: 14px;
                color: #666;

                .now {
                    font-weight: bold;
                    color: red;
                }
            }

            .number {
                margin: 20px 10px;
                display: flex;
                flex-wrap: wrap;

                span {
                    font-size: 14px;
                    line-height: 30px;
                }
            }

            button {
                margin-left: 10px;
                margin-bottom: 8px;
                height: 35px;
                line-height: 35px;
                padding: 0 15px;
                color: #fff;
            }

            button:last-child {
                margin-left: 0
            }
        }

        .floot {
            h3 {
                font-size: 18px;
                line-height: 40px;
                margin-left: 10px;
            }

            p {
                color: #666;
                font-size: 14px;
                line-height: 30px;
                margin-left: 10px;
            }
        }
    }
</style>