<template>
  <div class="login-container">
    <div class="left">
      <div class="desc-box">
        <img src="@/assets/login_icon.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub_title">用户登录</span>
      </div>

      <!-- 表单 -->
      <el-form :model="loginForm" ref="loginForm" status-icon :rules="rules" class="login-Form">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" v-model="loginForm.phone" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="17">
            <el-input placeholder="请输入验证码" v-model="loginForm.code" prefix-icon="el-icon-key"></el-input>
          </el-col>
          <el-col :span="7">
            <img class="captcha" :src="actions" @click="randomLoginCaptcha" alt />
          </el-col>
        </el-form-item>

        <el-form-item class="rule-box" prop="checked">
          <el-checkbox v-model="loginForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>
            <span>和</span>
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="registerFormVisible=true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_bg.png" alt />
    </div>

    <!-- 用户注册 -->

    <el-dialog
      title="用户注册"
      class="register-dialog"
      :visible.sync="registerFormVisible"
      @closed="closedRegDialog"
    >
     
      <el-form :model="regForm" :rules="rules"  ref="regForm">
         <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
            <el-upload
        class="avatar-uploader"
        :action="avatarAction"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        name="image"
      >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <!-- 不知道 -->
        <el-input v-model="regForm.avatar" type="hidden"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="regForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="regForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="regForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="regForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
          <el-col :span="16">
            <el-input placeholder="请输入验证码" v-model="regForm.imgCode" prefix-icon="el-icon-key"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="captcha" :src="regActions" @click="randomRegCaptcha"  alt />
          </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button @click="getPhoneCode" :disabled="delayTime !== 0">点击接收验证码{{ delayTime != 0 ? delayTime + "S" : "" }}</el-button>
            </el-col>
          </el-row>
          
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="registerFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRegForm('regForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import axios from 'axios'
import { login,sendsms,register } from "@/api/login.js";
import { setToken } from "@/utils/token.js";
import { checkPhone,checkAgree,checkEmail} from "@/utils/validator"
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        phone: "18522222222",
        password: "12345678",
        code: "1234",
        checked: false
      },
      actions: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      rules: {
        avatar:[
          {required:true,message:'头像不能为空',trigger: "change"}
        ],
        username: [{ required: true, message: "用户名不能为空" }],
        phone: [
          { required: true, message: "手机号不能为空" },
          { validator: checkPhone }
        ],
        email: [
          { required: true, message: "邮箱号不能为空" },
          { validator: checkEmail }
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, max: 12, message: "密码长度为6~12个字符" }
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          { min: 4, max: 4, message: "验证码长度为4" }
        ],
        //短信验证码
        rcode: [
          { required: true, message: "短信验证码不能为空" },
          { min: 4, max: 4, message: "短信验证长度为4" }
        ],
        checked: [
          { required: true, message: "协议必须勾选" },
          { validator: checkAgree }
        ]
      },
      registerFormVisible: false,
      formLabelWidth: "120px",
      regForm: {
        avatar:'',
        username: "nny",
        email: "1094616318@qq.com",
        phone: "15172873131",
        password: "nny3130",
        imgCode: "",
        rcode: ""
      },
      imageUrl:'',
      // 用户头像上传地址
      avatarAction:process.env.VUE_APP_BASEURL + "/uploads",
      // 注册图形码
      regActions:process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      // 验证码倒计时
      delayTime:0
    };
  },
  methods: { 
    submitForm(formName) {
      window.console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.loginForm).then(res => {
            window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("登录成功");
              setToken(res.data.data.token);
              this.$router.push("/index");
            } else {
              this.$message.warning(res.data.message);
              this.randomLoginCaptcha();
            }
          });
        } else {
          this.$message.warning("请检查输入的内容");
          return false;
        }
      });
    },
    // 登录验证码
    randomLoginCaptcha() {
      // 时间戳
      this.actions = `http://127.0.0.1/heimamm/public/captcha?type=login&${Date.now()}`;
      // 随机数
    },

    // 关闭注册框
    closedRegDialog() {
      this.$refs.regForm.resetFields();
      this.regForm.imgCode = "";
    },

    // 注册验证码
    randomRegCaptcha(){
      this.regActions = `http://127.0.0.1/heimamm/public/captcha?type=sendsms&${Date.now()}`;
    },
    // 文件上传
    handleAvatarSuccess(res, file) {
      window.console.log(res);
        this.imageUrl = URL.createObjectURL(file.raw);
        // 准备提交的数据
      this.regForm.avatar = res.data.file_path;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      // 获取手机验证码
      getPhoneCode(){
        //图片验证码判断
        if(this.regForm.imgCode.length !=4){
          return this.$message.warning('验证码错误，请检查')
        }
        //手机号判断
         const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      // 正则验证
      if (!reg.test(this.regForm.phone)) {
        // 错误提示
        return this.$message.warning('手机号不对')
      }
      if(this.delayTime == 0){
        this.delayTime = 60;
        let timer = setInterval(()=>{
          this.delayTime --;
          if(this.delayTime == 0){
            clearInterval(timer)
          }
        },100)

        //调用短信接口
        sendsms({
          code:this.regForm.imgCode,
          phone:this.regForm.phone
        }).then(res=>{
          window.console.log(res)
          if(res.data.code == 200){
            this.$message.info("短信验证码是:" + res.data.data.captcha)
          }else {
           
            this.$message.warning(res.data.message)
          }
        })
      }
      },


      //点击注册
      submitRegForm(formName){
        window.console.log(111)
        this.$refs[formName].validate(valid => {
          if(valid){
            // 注册接口、
            // window.console.log('注册成功')
            register(this.regForm).then(res =>{
              window.console.log(res)
              if (res.data.code === 200) {
              // 头像也要清空哦
              this.imageUrl = "";
              // 关闭弹框
              this.registerFormVisible = false;
              // 提示用户
              this.$message.success("注册成功")
            }
            })

          }else {
            this.$message.warning('请检查输入的内容')
            return false
          }
        })
      }
    }
  
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  display: flex;
  align-items: center;
  justify-content: space-around;
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    border-radius: 8px;
    box-shadow: 0 6px 20px 5px rgba(40, 120, 255, 0.1),
      0 16px 24px 2px rgba(0, 0, 0, 0.05);
    .desc-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 10px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: #ddd;
        margin-right: 10px;
        margin-top: 4px;
      }
      .sub_title {
        font-size: 22px;
      }
    }
    .login-Form {
      margin-top: 29px;
      .captcha {
        display: block;
        width: 110px;
        height: 42px;
      }
      .btn-box {
        button {
          width: 100%;
          margin-left: 0;
          margin-bottom: 28px;
        }
      }
    }
  }
  .register-dialog {
    .el-dialog {
      width: 600px;
    }
    .el-dialog__header {
      background: linear-gradient(
        right,
        rgba(1, 198, 250, 1),
        rgba(20, 147, 250, 1)
      );
      text-align: center;
      .el-dialog__title {
        color: white;
      }
    }
    .captcha {
      width: 100%
    }
    .avatar-uploader {
      display: flex;
      justify-content: center;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>