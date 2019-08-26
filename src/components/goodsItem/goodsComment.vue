<template>
    <comment-box :id="this.id"></comment-box>
</template>

<script>
    import comment from '../subComments/comment.vue'
    export default {
        data(){
            return{
                id: this.$route.params.id,
            }
        },
        methods:{

        },
        components:{
            "comment-box" : comment
        }
    }
</script>

<style scoped>

</style>