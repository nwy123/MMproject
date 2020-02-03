<template>
  <div class="subject-container">
    <el-card class="card-header">
      <el-form :inline="true" :model="filterForm" ref="filterForm" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="filterForm.rid" class='w100'></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="filterForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="filterForm.username" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
    <el-select v-model="filterForm.status" placeholder="请选择状态">

      <!-- 需要绑定value，且需要和后台规定的值相同 -->
      <el-option label="启用" value="1"></el-option>
      <el-option label="禁用" value="0"></el-option>
    </el-select>
  </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterData">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  @click="resetForm">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  icon="el-icon-plus" @click="addFormVisible = true">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="card-body">
        <el-table :data="subjectTable" style="width: 100%" >
      <el-table-column type="index" label="序号">
      </el-table-column>
      <el-table-column prop="rid" label="学科编号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="学科名称">
      </el-table-column>
      <el-table-column prop="short_name" label="简称">
      </el-table-column>
      <el-table-column prop="username" label="创建者">
      </el-table-column>
      <el-table-column prop="create_time" label="创建日期">
        <template slot-scope="scope">
          {{scope.row.create_time | formatTime}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if='scope.row.status == 1'>启用</span>
          <span v-else style="color:red">禁用</span>
        </template>
      </el-table-column>
      <el-table-column prop="option" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editForm(scope.row)">编辑</el-button>
          <el-button type="text" @click="changeStatus(scope.row)">{{scope.row.status == 0?'启用':'禁用'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1,2, 5, 20]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>


    <!-- 新增对话框 -->
  <subjectAdd></subjectAdd>

  <!-- 编辑对话框 -->
  <subjectEdit ref='subjectEdit'></subjectEdit>
  </div>

  
</template>
<script>
import {subjectList,subjuecStatus} from '@/api/subject.js'
//导入组件
import subjectAdd from './components/subjectAdd.vue'
import subjectEdit from './components/subjectEdit'
import { Message } from 'element-ui'
export default {
  name:'subject',
  //注册组件
 components:{
    subjectAdd,subjectEdit
  },
    data() {
        return {
           
        // 是否显示新增对话框
        addFormVisible:false,
        //显示编辑对话框
        editFormVisible:false,
        //当前页
        page:1,
        //页尺寸,每页显示数据条数
       limit:1,
       //总条数
       total:0,
       filterForm:{
         rid:'',
         name:'',
         username:'',
         status:''
       },
        subjectTable: [{
            rid: 'JAVA001',
            name: 'JavaWeb',
            short_name:'JavaWeb',
            username:'phper_leo',
            data:"2020年01月14日",
            status:'启用',
            option:'删除'
          }, 
          {
            rid: 'JAVA001',
            name: 'JavaWeb',
            short_name:'JavaWeb',
            username:'phper_leo',
            data:"2020年01月14日",
            status:'启用',
            option:'删除'
          }
          ]
        }
    },
    methods: {
     
      //获取数据列表
      getList(){
        subjectList({
          limit:this.limit,
          page:this.page,
          ...this.filterForm
        }).then(res=>{
          window.console.log(res)
          if(res.data.code == 200){
            this.subjectTable = res.data.data.items;
            this.total = res.data.data.pagination.total
          }
          
        })
      },
      //页容量改变
      handleSizeChange(val){
        this.limit = val;
        this.page = 1;
        //重新获取数据
        this.getList()
      },
      // 当前页改变
      handleCurrentChange(val){
        this.page = val;
        this.getList()
      },
      //修改状态
      changeStatus(item){
        subjuecStatus({
          id:item.id
        }).then(res =>{
          window.console.log(res)
          if(res.data.code == 200){
            //重新获取数据
            Message.success('状态修改成功')
            this.getList()
          }
        })
      },
      // 筛选数据
      filterData(){
        this.page = 1;
        this.getList();
      },
      // 清空表单
      resetForm(){

        // 需要给表单el-form-item绑定prop属性，且字段和v-model名称一致
        window.console.log('清除')
        this.$refs.filterForm.resetFields()
      },
      editForm(item){
        //把该条数据传给子组件
        this.$refs.subjectEdit.editForm = JSON.parse(JSON.stringify(item))
        this.editFormVisible = true;
      }

    },
   
    created(){
      //获取学科列表
      this.getList()
    }
};
</script>
<style lang="less">
.el-main {
  background: #e8e9ec;
  .w100 {
      width: 100px
  }
  
}
.card-body {
      margin-top: 20px;
      .el-pagination {
        margin-top: 30px;
        text-align: center;
      }
  } 
</style>