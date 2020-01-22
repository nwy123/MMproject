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
            <img class="captcha" ref="captcha" :src="actions" @click="randomLoginCaptcha" alt />
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
          <el-button>注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_bg.png" alt />
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import { login } from '@/api/login.js'
import { setToken } from '@/utils/token.js'
export default {
  name: "login",
  data() {
    var checkPhone = (rule, value, callback) => {
      // 正则
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      // 正则验证
      if (!reg.test(value)) {
        // 错误提示
        return callback(new Error("请输入正确的手机号"));
      }
      // 正确提示
      callback();
    };

    return {
      loginForm: {
        phone: "18522222222",
        password: "12345678",
        code: "1234",
        checked: false
      },
      actions: process.env.VUE_APP_BASEURL+"/captcha?type=login",
      rules: {
        phone: [
          { required: true, message: "手机号不能为空" },
          { validator: checkPhone }
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, max: 12, message: "密码长度为6~12个字符" }
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          { min: 4, max: 4, message: "验证码长度为4" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      window.console.log(formName);
      this.$refs[formName].validate(valid =>{
        if(valid){
          login(this.loginForm).then(res => {
            window.console.log(res)
            if(res.data.code == 200){
              this.$message.success('登录成功');
              setToken(res.data.data.token)
              this.$router.push('/index')
            }else {
              this.$message.warning(res.data.message)
              this.randomLoginCaptcha()
            }
          })
        }else {
          this.$message.warning('请检查输入的内容');
          return false
        }
      })
      
    },
    randomLoginCaptcha() {
      // 时间戳
      this.$refs.captcha.src = `http://127.0.0.1/heimamm/public/captcha?type=login&${Date.now()}`;
      // 随机数
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
}
</style>