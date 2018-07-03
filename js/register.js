//手机验证
var phoneNumberReg = /^[1]{1}[3|5|7|8]{1}\d{9}$/;
var passwordReg = /^[a-zA-Z0-9]{6,16}$/;
var phoneNumber = document.getElementById('phoneNumber');
var form = document.getElementById('form');
var success = document.getElementById('success');
var message = document.getElementById('message');
var password = document.getElementById('password');
var picCode = document.getElementById('picCode');
var numCode = document.getElementById('numCode');
var getCodeBtn = document.getElementById('getCodeBtn');
var fOver = true; // 获取验证码是否可点击
var code = ''; // 生成的验证码
function getCode() {
  if (fOver) {
    if (phoneNumber.value == '') {
      showMsg('请输入手机号');
      return;
    } else {
      if (phoneNumberReg.test(phoneNumber.value) == false) {
        showMsg('请输入正确的手机号');
        return;
      } else {
        fOver = false;
        getCodeBtn.classList.add("disabled");
        var second = 60;
        getCodeBtn.innerText = second + ' 秒';
        timerSecond = setInterval(function () {
          second = second - 1;
          getCodeBtn.innerText = second + ' 秒';

          if (second <= 0) {
            clearInterval(timerSecond);
            getCodeBtn.innerText = '重新发送';
            fOver = true;
            getCodeBtn.classList.remove("disabled");
          }
        }, 1000);
      }
    }
  }
}
function signIn() {
  if (phoneNumber.value == '') {
    showMsg('请输入手机号');
    return;
  } else if (phoneNumberReg.test(phoneNumber.value) == false) {
    showMsg('请输入正确的手机号');
    return;
  } else if (picCode.value == '') {
    showMsg('请输入图形验证码');
    return;
  } else if (picCode.value != code) {
    showMsg('请输入正确的图形验证码');
    createCode(); //刷新验证码
    return;
  } else if (numCode.value == '') {
    showMsg('请输入验证码');
    return;
  } else if (password.value == '') {
    showMsg('请输入密码');
    return;
  } else if (passwordReg.test(password.value) == false) {
    showMsg('密码格式不正确');
    return;
  } else {
    goDownload();
  }
}
function goDownload() {
  form.classList.add("none");
  success.classList.remove("none");
}
function showMsg(msg) {
  // console.log('msg、', msg);
  message.innerText = msg;
  message.classList.remove("none");
  setTimeout(function () {
    message.innerText = '';
    message.classList.add("none");
  }, 1500);
}
// 前端生成验证码
function createCode() {
  code = "";
  var codeLength = 4;//验证码的长度
  var checkCode = document.getElementById("checkCode");
  var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//所有候选组成验证码的字符，当然也可以用中文的
  for (var i = 0; i < codeLength; i++) {
    var charIndex = Math.floor(Math.random() * 36);
    code += selectChar[charIndex];
  }
  checkCode.classList.add("code");
  checkCode.innerText = code;
}
