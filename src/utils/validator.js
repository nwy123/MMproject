// 验证手机号
export function  checkPhone (rule, value,  callback) {
    // 正则
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    // 正则验证
    if (!reg.test(value)) {
      // 错误提示
      return callback(new Error("请输入正确的手机号"));
    }
    // 正确提示
    callback();
  }
  
    // 验证协议勾选
    export function checkAgree (rule, value, callback){
        if (value == false) {
          return callback(new Error("必须勾选协议"));
        }
        callback();
      }
      // 邮箱验证
    export function checkEmail(rules, value, callback) {
        var reg = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
        if (!reg.test(value)) {
          return callback(new Error("请输入正确的邮箱"));
        }
        //正确提示
        callback();

      }