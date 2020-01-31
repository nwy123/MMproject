<template>
  <el-container>
    <el-header>
      <div class="left">
        <i class="icon el-icon-s-operation"></i>
        <img src="@/assets/index_icon.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="userinfo.avatar" alt />
        <span class="name">{{userinfo.username}},您好</span>
        <el-button type="primary" size="mini" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
import {logout} from '@/api/request.js'
export default {
    computed:{
        userinfo(){
            return this.$store.state.userInfo
        }
    },
    methods:{
        logout(){
           this.$confirm('是否确认退出登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            logout().then(res =>{
                window.console.log(res)
            })
        //   this.$message({
        //     type: 'success',
        //     message: '成功退出'
        //   });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
    }
}
}
</script>
<style lang="less">
.el-container {
  .el-header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .icon {
        font-size: 30px;
        margin-right: 20px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
        margin-left: 10px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .name {
        margin-right: 40px;
      }
    }
  }
}
</style>