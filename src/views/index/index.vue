<template>
  <el-container>
    <el-header>
      <div class="left">
        <i class="icon el-icon-s-operation" @click="isCollapse = !isCollapse"></i>
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
      <el-aside width="200px">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
      >
      
        <template >
         <el-menu-item index="/index/subject">
        <i class="el-icon-menu"></i>
        <span slot="title">数据概况</span>
      </el-menu-item>
      <el-menu-item index="/index/subject" >
        <i class="el-icon-document"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
      <el-menu-item index="/index/enterprise">
        <i class="el-icon-setting"></i>
        <span slot="title">题库列表</span>
      </el-menu-item>
      <el-menu-item index="/index/enterprise">
        <i class="el-icon-setting"></i>
        <span slot="title">企业列表</span>
      </el-menu-item>
      <el-menu-item index="/index/subject">
        <i class="el-icon-setting"></i>
        <span slot="title">学科列表</span>
      </el-menu-item>
      <el-menu-item index="/index/enterprise">
        <i class="el-icon-setting"></i>
        <span slot="title">参加测试</span>
      </el-menu-item>
        </template>
    </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { logout } from "@/api/login.js";
import { removeToken } from '@/utils/token.js'
import routes from '@/router/router.js'
export default {
  name:'index',
  data() {
      return {
        isCollapse:false,
        routes
      }
    },
    
  computed: {
    
    userinfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
  
  logout() {
    window.console.log(this.$store.state.userInfo);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         
          logout().then(res => {
            window.console.log(res);
            // this.$store.state.userInfo=''
         if(res.data.code == 200){


           this.$message({
              type:'success',
              message:'退出成功'
            })
           removeToken();
           this.$store.commit('setInfo',undefined)
           this.$router.push('/login')
         }
            
            
            
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    beforeCreate() {
      window.console.log(this.$store.state.userInfo);
    },
};
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