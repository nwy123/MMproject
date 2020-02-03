<template>
  <el-dialog title="修改学科" :visible.sync="$parent.editFormVisible" :before-close="handleClose">
    <!-- 表单 -->
    <el-form
      :model="editForm"
      ref="editForm"
      label-width="80px"
      status-icon
      :rules="rules"
      class="login-Form"
    >
      <el-form-item prop="rid" label="学科编号">
        <el-input v-model="editForm.rid"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="学科名称">
        <el-input v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="editForm.short_name"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro">
        <el-input type="textarea" v-model="editForm.intro"></el-input>
      </el-form-item>
      <el-form-item label="学科备注">
        <el-input v-model="editForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$parent.editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submiteditForm('editForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { subjectEdit } from '@/api/subject.js'
import { Message } from 'element-ui'
export default {
  name: "subject-add",
  data() {
    return {
      editForm: {
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
      this.$parent.editFormVisible = false;
    },
    submiteditForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          subjectEdit(this.editForm).then(res => {
              window,console.log(res)
              if(res.data.code == 200){
                  //重置表单
                  this.$refs.editForm.resetFields()
                //   关闭对话框
                this.$parent.editFormVisible = false
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