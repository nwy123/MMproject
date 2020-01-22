<template>
    <div>
        index
    </div>
</template>
<script>
import { getToken } from '@/utils/token.js'
export default {
    beforeCreate(){
        if(!getToken()){
            this.$message.error('必须登录才可以访问首页')
            this.$router.push('/login')
        }
    }
}
</script>
<style lang="less">
    
</style>