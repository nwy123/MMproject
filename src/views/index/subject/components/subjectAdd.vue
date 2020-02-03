<template>
  <el-dialog title="新增学科" :visible.sync="$parent.addFormVisible" :before-close="handleClose">
    <!-- 表单 -->
    <el-form
      :model="addForm"
      ref="addForm"
      label-width="80px"
      status-icon
      :rules="rules"
      class="login-Form"
    >
      <el-form-item prop="rid" label="学科编号">
        <el-input v-model="addForm.rid"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="学科名称">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="addForm.short_name"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro">
        <el-input type="textarea" v-model="addForm.intro"></el-input>
      </el-form-item>
      <el-form-item label="学科备注">
        <el-input v-model="addForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$parent.addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitAddForm('addForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { subjectAdd } from '@/api/subject.js'
import { Message } from 'element-ui'
export default {
  name: "subject-add",
  data() {
    return {
      addForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleClose() {
      this.$parent.addFormVisible = false;
    },
    submitAddForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          subjectAdd(this.addForm).then(res => {
              window,console.log(res)
              if(res.data.code == 200){
                  //重置表单
                  this.$refs.addForm.resetFields()
                //   关闭对话框
                this.$parent.addFormVisible = false
                // 重新获取数据
                this.$parent.getList()
              }
          })
        } else {
          Message.warning('学科信息输入有误')
          return false;
        }
      });
    }
  }
};
</script>