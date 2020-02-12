<template>
  <div class="enterprise-container">
    <el-card class="card-header">
      <el-form :inline="true" ref="filterForm" :model="filterForm" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="filterForm.eid" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="filterForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="filterForm.username" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="filterForm.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="searchData">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resitForm">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="card-body">
      <el-table :data="enterpriseForm" style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号" width="180"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="180"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
            <template slot-scope="scope"> 
            {{scope.row.create_time | formatTime}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope"> 
            
           <span v-if="scope.row.status==1">启用</span>
           <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>

          <el-button type="text">{{scope.row.states == 1?'禁用':'启用'}}</el-button>
          </template>
          
        </el-table-column>
      </el-table>

      <el-pagination
        background
        
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { enterpriseList } from "@/api/enterprise.js"

export default {
  data() {
    return {
      filterForm: {
        eid: "",
        name: "",
        username: "",
        status: ""
      },
      enterpriseForm:[
          {
          name:'11',
          eid:'11',
          username:'1111',
          status:'启用',
          create_time:'2020-2-7'
      },
       {
          name:'11',
          eid:'11',
          username:'1111',
          status:'启用',
          create_time:'2020-2-7'
      }
      ],
    //   当前页
      page:1,
    //   每页显示个数
      limit:2,
      total:0
    };
  },
  methods:{
      //获取数据列表
      getList(){
          enterpriseList({
              limit:this.limit,
              page:this.page,
              ...this.filterForm
          }).then(res=>{
              window.console.log(res)
              if(res.data.code == 200){
                  this.enterpriseForm = res.data.data.items
                  this.total = res.data.data.pagination.total
              }
          })
      },

    //   页容量改变
    handleSizeChange(val){
        this.limit = val
        this.page = 1
        this.getList()
    },

    //当前页改变
    handleCurrentChange(val){
        this.page = val;
        this.getList()
    },

    //搜索数据
    searchData(){
      this.page = 1;
      this.getList()
    },

    // 清除数据
    resitForm(){
       this.$refs.filterForm.resetFields();
    }

      },
      created(){
          this.getList()
      }
  
};
</script>
<style lang="less">
</style>