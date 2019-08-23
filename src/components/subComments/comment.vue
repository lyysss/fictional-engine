<template>
    <div class="comment">
        <h3>- 发表评论 -</h3>
        <hr>
        <van-cell-group>
            <van-field
                    v-model="message"
                    label="评论"
                    type="textarea"
                    placeholder="请输入评论内容...(最多可输入120字段.)"
                    rows="3"
                    autosize
                    border
                    maxlength="120"
                    />
        </van-cell-group>
        <van-button type="primary" size="large" @click="setComment">发表评论</van-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.id">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;{{item.user_name}}&nbsp;&nbsp;&nbsp;&nbsp;发表时间:{{item.add_time | dateFormat}}
                </div>
                <div class="cmt-text">{{item.content === '' ? '评论隐藏了':item.content}}</div>
            </div>
        </div>
        <van-button plain hairline type="primary" @click="commentMore" class="more">点我加载更多...</van-button>
    </div>
</template>

<script>
    export default {
        name: "comment",
        data(){
            return{
                message:"",
                pageIndex : 1,
                comments:[], //所有的评论数据
            }
        },
        created(){
            this.getComment()
        },
        methods:{

            getComment(){
                this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result =>{
                    if(result.body.status === 0){
                        this.comments = this.comments.concat(result.body.message)
                    }else{
                        this.mounted();
                    }
                })
            },
            commentMore(){
                this.pageIndex++;
                this.getComment()
            },
            mounted() {
                this.$toast('评论不能为空...');
            },
            mounted1() {
                this.$toast('评论提交成功');
            },

            setComment(){
                if(this.message.trim().length === 0){
                    this.mounted();
                    return
                }
                this.$http.post("api/postcomment/"+this.id,{content: this.message.trim()})
                    .then(result =>{
                        if(result.body.status ===0){
                            var cmt = {user_name:'路人A',add_time:Date.now(),content:this.message.trim()};
                            this.comments.unshift(cmt);
                                this.mounted1();
                        }
                })

            }
        },
        props: ['id']
    }
</script>

<style scoped lang="less">
    .comment{
        .cmt-list{
            margin-top: 10px;
            margin-bottom: 10px;
            .cmt-item{
                margin: 5px;
                font-size: 14px;
                .cmt-title{
                    background-color: #ccc;
                    line-height: 30px;
                    padding: 0 10px;
                }
                .cmt-text{
                    line-height: 25px;
                    text-indent: 2em;
                    background-color: #f5f5f5;
                    padding: 5px;
                }
            }
        }
        .more{
            display: block;
            margin: 0 auto;
            width: 60%;
        }
    }
</style>