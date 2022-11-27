<template>
<div id="login_box">

<div class="left_box"></div>
<div class="choose_box">
  <img src="../../../public/imag/登陆界面.jpg">
  <div class="choose_box_center">
    <h1>烹饪服务预约网站</h1>
    <p>欢迎您的到来</p>
    <button class="theCustomer_login_btn" @click="theCustomerLogin"  :style="{borderColor:chooseColor}" ><User style="height: 18px;width:18px;position: absolute;left: 30px;top: 14px;" />顾客登录</button>
    <button class="theCook_login_btn" @click="theCookLogin" :style="{borderColor:CookchooseColor}"><Dish style="height: 18px;width:18px;position: absolute;left: 30px;top: 14px;"/>厨师登录</button>
    <!-- <button class="registered_btn">注册<Right style="height: 25px;width:25px; position: absolute; "/><i class="el-icon-edit"></i></button> -->
    <div class="xiaosanjiao"></div>

    <!-- @click="theCustomerLogin"
    @click="theCookLogin" -->
  </div>
 
</div>
<div class="login_form_box">
  <form @submit.prevent="" class="login_page" :style="{left:loginLeft+'px'}" >
    <p>账号</p>
    <input type="text" class="username_input" placeholder="用户名"
     v-model="CustomerName"
     @blur="checkInput(0)"
     @focus="usernameStatus=false"
    >
    <span class="username_error" v-if="usernameStatus">请输入您的账号</span>
    <p class="password_p">密码</p>
    <input type="password" class="password_input" placeholder="8到16位的密码"
     v-model="CustomerPassWord"
     @blur="checkInput(1)"
     @focus="passwordStatus=false"
    >
    <span class="password_error" v-if="passwordStatus">请输入您的密码</span>
    <!-- 验证码 -->
    <div class="VerificationCode_box">
      <p class="code_p">验证码</p>
      <input type="text" placeholder="验证码" class="code_input"
      v-model="LoginCode"
      @blur="checkInput(2)"
      @focus="codeStatus=false;meesagCodeStatus=false"
      >
      <div class="gteCode_box" @click="getCode" style="background: linear-gradient(to bottom Right,#a0cfff, #529b2e,#c8c9cc)" >
        <div class="gteCode_box2" v-if="isOkGetCodeStatus" > 
        <p :style="{fontFamily:zitiRound1,transform:`rotateZ(${jiaoduRound1+'deg'})`}">{{firstNumber}}</p>
        <p :style="{fontFamily:zitiRound1}">{{fuhaoround}}</p>
        <p :style="{fontFamily:zitiRound2,transform:`rotateZ(${jiaoduRound2+'deg'})`}">{{secondNumber}}</p>
        <p :style="{fontFamily:zitiRound2}">=</p>
        <p :style="{fontFamily:zitiRound1}">?</p>
       </div>
       <div class="gteCode_box3">
        <button v-if="!isOkGetCodeStatus" @click="isOkGetCodeStatus=true" >点击获取验证码</button>
       </div>
      </div>
      <span class="code_error" v-if="codeStatus">请输入验证码</span>
      <span class="code_error" v-if="meesagCodeStatus">验证码错误</span>
    </div>
 
    <button class="forgetPassword_btn"><QuestionFilled style="height: 16px;width:16px;position: absolute;left: 10px;"/>忘记密码</button>
    <button class="login_btn" @click="OkCustomerLogin">登录</button>
    
    <el-link class="register_btn"  @click="toRegisteredPage(0)">没有账号？可以先进行注册</el-link>
  </form>
<!-- 厨师登录 -->
  <form @submit.prevent="" class="login_page" :style="{left:cookloginLeft+'px'}"> 
    <p>账号</p>
    <input type="text" class="username_input" placeholder="厨师编号"
    v-model="CookNumber"
     @blur="CcheckInput(0)"
     @focus="CookNumberStatus=false"
    >
    <span class="username_error" v-if="CookNumberStatus">请输入您的账号</span>
    <p class="password_p">密码</p>
    <input type="password" class="password_input" placeholder="8到16位的密码"
    v-model="CookPassWord"
     @blur="CcheckInput(1)"
     @focus="CookpasswordStatus=false"
    >
    <span class="password_error" v-if="CookpasswordStatus">请输入您的密码</span>
    <!-- 验证码 -->
    <div class="VerificationCode_box">
      <p class="code_p">验证码</p>
      <input type="text" placeholder="验证码" class="code_input"
      v-model="CLoginCode"
      @blur="CcheckInput(2)"
      @focus="CcodeStatus=false;CmeesagCodeStatus=false"
      >
      <div class="gteCode_box" @click="CgetCode" style="background: linear-gradient(to bottom Right,#a0cfff, #529b2e,#c8c9cc)" >
        <div class="gteCode_box2" v-if="CisOkGetCodeStatus" > 
        <p :style="{fontFamily:CzitiRound1,transform:`rotateZ(${CjiaoduRound1+'deg'})`}">{{CfirstNumber}}</p>
        <p :style="{fontFamily:CzitiRound1}">{{Cfuhaoround}}</p>
        <p :style="{fontFamily:CzitiRound2,transform:`rotateZ(${CjiaoduRound2+'deg'})`}">{{CsecondNumber}}</p>
        <p :style="{fontFamily:CzitiRound2}">=</p>
        <p :style="{fontFamily:CzitiRound1}">?</p>
       </div>
       <div class="gteCode_box3">
        <button v-if="!CisOkGetCodeStatus" @click="CisOkGetCodeStatus=true" >点击获取验证码</button>
       </div>
      </div>
      <span class="code_error" v-if="CcodeStatus">请输入验证码</span>
      <span class="code_error" v-if="CmeesagCodeStatus">验证码错误</span>
    </div>
    <button class="forgetPassword_btn"><QuestionFilled style="height: 16px;width:16px;position: absolute;left: 8px;"/>忘记密码</button>
    <button class="login_btn" @click="OkCookLogin" >登录</button>
    <el-link class="register_btn" @click="toRegisteredPage(1)">没有账号？可以先进行注册</el-link>
  </form>
</div>
  </div>



  

</template>

<script setup lang="ts">
import { ref,reactive,onMounted } from 'vue';
import {  ElMessage } from 'element-plus'
import { Right,QuestionFilled,User,Dish, } from '@element-plus/icons-vue'
import { conforms } from 'lodash';
import { el } from 'element-plus/es/locale';
import {customerLoginData,LoginFn,LoginType} from '../../common/common'
import {useRouter} from 'vue-router'

const router = useRouter();
//顾客登录data
let theCustomerWidth = ref<number>(0)
let theCustomerLoginStatus = ref<Boolean>(false)
let loginLeft=ref<number>(0)
let chooseColor=ref<string>('')
let CustomerName =ref<string>('')
let CustomerPassWord = ref<string>('')
let LoginCode = ref<number>()
let usernameStatus=ref<Boolean>(false)
let passwordStatus=ref<Boolean>(false)
let codeStatus=ref<Boolean>(false)
let meesagCodeStatus=ref<Boolean>(false)
let firstNumber= ref<number>()
let secondNumber = ref<number>()
let sum = ref<number>()
let fuhaoround = ref<string>('')
let zitiRound1=ref<string>('')
let zitiRound2=ref<string>('')
let zitiRound3=ref<string>('')
let jiaoduRound1 = ref<string>()
let jiaoduRound2 = ref<string>()
let isOkGetCodeStatus = ref<Boolean>(false)

//厨师登录data
let CookNumber=ref<string>()
let CookPassWord=ref<string>()
let CookNumberStatus=ref<Boolean>()
let CookpasswordStatus=ref<Boolean>()
let CLoginCode = ref<number>()
let CookchooseColor=ref<string>('')
let cookloginLeft=ref<number>(0)
let theCookWidth = ref<number>(0)
let CcodeStatus=ref<Boolean>(false)
let CmeesagCodeStatus=ref<Boolean>(false)
let CfirstNumber= ref<number>()
let CsecondNumber = ref<number>()
let Csum = ref<number>()
let Cfuhaoround = ref<string>('')
let CzitiRound1=ref<string>('')
let CzitiRound2=ref<string>('')
let CzitiRound3=ref<string>('')
let CjiaoduRound1 = ref<string>()
let CjiaoduRound2 = ref<string>()
let CisOkGetCodeStatus = ref<Boolean>(false)




onMounted(()=>{
  getCode();
})

 const theCustomerLogin = ()=>{
  theCustomerWidth.value=500;
  theCookWidth.value=0;
  loginLeft.value=530;
  cookloginLeft.value=0;
  chooseColor.value='#00ac6a'
  CookchooseColor.value=''
  passwordStatus.value=false;
  usernameStatus.value=false;
  codeStatus.value=false;
  meesagCodeStatus.value=false;
 }
 const theCookLogin = ()=>{
  theCookWidth.value=500;
  theCustomerWidth.value=0;
  loginLeft.value=0;
  cookloginLeft.value=530;
  chooseColor.value='';
  CookchooseColor.value='#00ac6a';

  CookpasswordStatus.value=false;
  CookNumberStatus.value=false;
  CcodeStatus.value=false;
  CmeesagCodeStatus.value=false;

  

 }
//表单验证
 const checkInput=(index:number)=>{
  if(index==0){
    if(!CustomerName.value){
       usernameStatus.value=true
    }
  }else if(index==1){
    if(!CustomerPassWord.value){
      passwordStatus.value=true
    }
  }else{
  if(index==2){
    if(!LoginCode.value){
      codeStatus.value=true
      
    }
  }
   
 }
}
//获取验证码
const getCode=()=>{

//随机生成数字0-9
firstNumber.value=Math.round(Math.random()*9);
secondNumber.value=Math.round(Math.random()*9);
let fuhao:any=['+','-','*','+','+','-','*','*','+','-']
let ziti:any=['宋体','Ink Free','MV Boli','Segoe Script','汉仪青云简','微软雅黑','Courier New','Franklin Gothic Medium','Gabriola','Times New Roman']
let jiaodu:any=[0,-30,80,-80,-20,40,30,-10,70,50]
//s随机生成运算符
for(let i=0;i<fuhao.length;i++){
  fuhaoround.value=fuhao[firstNumber.value]
}
if(fuhaoround.value==='+'){
  sum.value=firstNumber.value+secondNumber.value;
}else if(fuhaoround.value==='-'){
  sum.value=firstNumber.value-secondNumber.value;
}else if(fuhaoround.value==='*'){
  sum.value=firstNumber.value*secondNumber.value;
}

//随机生成字体

  zitiRound1.value=ziti[firstNumber.value];
  zitiRound2.value=ziti[secondNumber.value];
 
//随机生成角度
  jiaoduRound1.value=jiaodu[firstNumber.value];
  jiaoduRound2.value=jiaodu[secondNumber.value];
}

const OkCustomerLogin=()=>{
  //点击登录，先验证验证码是否正确
  if (!CustomerName.value){
    usernameStatus.value=true
  }
  else if(!CustomerPassWord.value){
    passwordStatus.value=true
  }
  else if(LoginCode.value==sum.value){
   meesagCodeStatus.value=false
   LoginFn(CustomerName.value,CustomerPassWord.value)
   if(customerLoginData.readyStatus===4){
    if(customerLoginData.status>=200&&customerLoginData.status<300){
    ElMessage({
    message: '登陆成功',
    type: 'success',
  });
    //  const $router = useRouter();
     setTimeout(()=>{
    
      router.push('/');
     },500)
        
    //  $router.push({path:'/'});
    }
   }else
   ElMessage.error('账号或密码错误，登陆失败')



  //发送ajax，向服务器发送请求，调用后端接口，后端验证传送的账号密码是否正确，
  //正确返回token登录令牌
 
  // 获取XMLHttpRequest对象
//  let xmlHttp=new XMLHttpRequest();
  //连接服务器
  // xmlHttp.open("post","服务器暴露接口")
  //设置请求头的Content-Type
  // xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded")

  //发送数据
  // let UserName=CustomerName.value
  // let password=CustomerPassWord.value
  //请求体数据
  // xmlHttp.send(UserName+password)

  //请求后回调函数
  // xmlHttp.onreadystatechange=()=>{
  //   if(xmlHttp.readyState==4){
  //     if(xmlHttp.status>=200&&xmlHttp.status<300){
  //       console.log(xmlHttp.responseText)//请求成功返回的数据也就是token
  //       alert('登录成功')
  //     }
  //   }else{
  //     alert('登陆失败')
  //   }
  // }

  } 
  else if(!LoginCode.value){
    codeStatus.value=true
  }
  else {
   meesagCodeStatus.value=true   
  }
}


//厨师登录验证表单
const CcheckInput=(index:number)=>{
  if(index==0){
    if(!CookNumber.value){
       CookNumberStatus.value=true
    }
  }else if(index==1){
    if(!CookPassWord.value){
      CookpasswordStatus.value=true
    }
  }else{
  if(index==2){
    if(!CLoginCode.value){
      CcodeStatus.value=true
      
    }
  }
   
 }
}

//厨师获取验证码
const CgetCode=()=>{

//随机生成数字0-9
CfirstNumber.value=Math.round(Math.random()*9);
CsecondNumber.value=Math.round(Math.random()*9);
let fuhao:any=['+','-','*','+','+','-','*','*','+','-']
let ziti:any=['宋体','Ink Free','MV Boli','Segoe Script','汉仪青云简','微软雅黑','Courier New','Franklin Gothic Medium','Gabriola','Times New Roman']
let jiaodu:any=[0,-30,80,-80,-20,40,30,-10,70,50]
//s随机生成运算符
for(let i=0;i<fuhao.length;i++){
  Cfuhaoround.value=fuhao[CfirstNumber.value]
}
if(Cfuhaoround.value==='+'){
  Csum.value=CfirstNumber.value+CsecondNumber.value;
}else if(Cfuhaoround.value==='-'){
  Csum.value=CfirstNumber.value-CsecondNumber.value;
}else if(Cfuhaoround.value==='*'){
  Csum.value=CfirstNumber.value*CsecondNumber.value;
 
}

//随机生成字体

  CzitiRound1.value=ziti[CfirstNumber.value];
  CzitiRound2.value=ziti[CsecondNumber.value];
 
//随机生成角度
  CjiaoduRound1.value=jiaodu[CfirstNumber.value];
  CjiaoduRound2.value=jiaodu[CsecondNumber.value];
}

const OkCookLogin=()=>{

  if(CLoginCode.value==Csum.value){
   CmeesagCodeStatus.value=false
  
  } else if(!CLoginCode.value){
    CcodeStatus.value=true

  }
  else if(CLoginCode.value!=Csum.value) {
   
   CmeesagCodeStatus.value=true
       
}
}

const toRegisteredPage = (index:number)=>{
  loginLeft.value=0;
  cookloginLeft.value=0;
  setTimeout(()=>{router.push({path:'/registered',query:{registeredType:index}})},0)
  
}








</script>

<style lang="less">
@import url("./login.less");
</style>