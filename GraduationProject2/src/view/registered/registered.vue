<template>
<div class="registered_box">
<div class="registered_head">
 <div class="toLogin"  :style="windowWidth<1080 ? {right:0+'px'}:''">
  <button @click="registeredType<1?toLoginPage(ruleFormRef):toLoginPage(CookruleFormRef)"><p>登录</p><Right style="height: 20px; width: 28px;position: absolute;top:8px;right: 25px;"/></button>
</div>
<div class="registered_type">
  <p v-if="registeredType<1">顾客注册</p>
  <p v-if="registeredType>0">厨师注册</p>
</div>
</div>
<div class="form_box">
  <!-- 顾客注册 -->
<el-form 
@submit.prevent
v-if="registeredType<1" 
ref="ruleFormRef"
label-width="120px"
label-position="top"
style="max-width: 400px;"
size="large"
:model="customerRegisterdData"
:rules="rules"
>
  <el-form-item label="电话号码" prop="phone">
      <el-input v-model="customerRegisterdData.Phone"  placeholder="请输入电话号码" @blur="checkPhone(customerRegisterdData.Phone)" />
  </el-form-item>


  <el-form-item label="用户名" prop="username">
      <el-input v-model="customerRegisterdData.CustomerName"  disabled  />
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input
    v-model.trim="customerRegisterdData.PassWord"
    type="password"
    placeholder="请设置密码"
    show-password
  />
  </el-form-item>
  <el-form-item label="确认密码" prop="checkpassword">
    <el-input
    v-model.trim="customerRegisterdData.CheckPassWord"
    type="password"
    placeholder="请确认密码"
    show-password
  /> 
  </el-form-item>
  
  <el-form-item>
      <!-- <el-button plain="true"  @click="submitForm(ruleFormRef)" class="Registerd_btn">注册</el-button> -->
      <button class="Registerd_btn" @click="submitForm(ruleFormRef)">注册</button>
      
  </el-form-item>
  
</el-form>

<!-- 厨师注册 -->
<el-form 
@submit.prevent
v-if="registeredType>0"
ref="CookruleFormRef"
label-width="120px"
label-position="top"
style="max-width: 400px;"
size="large"
:model="cookRegisterdData"
:rules="Cookrules"
>
  
  <el-form-item label="电话号码" prop="Cookphone">
      <el-input v-model="cookRegisterdData.Phone"  placeholder="请输入电话号码" @blur="checkCookPhone(cookRegisterdData.Phone)"  />
  </el-form-item>
  <el-form-item label="厨师编号">
      <el-input v-model="cookRegisterdData.CookName" disabled />
  </el-form-item>
  <el-form-item label="密码" prop="Cookpassword">
    <el-input
    v-model.trim="cookRegisterdData.PassWord"
    type="password"
    placeholder="请设置密码"
    show-password
  />
  </el-form-item>
  <el-form-item label="确认密码" prop="Cookcheckpassword">
    <el-input
    v-model.trim="cookRegisterdData.CheckPassWord"
    type="password"
    placeholder="请确认密码"
    show-password
  /> 
  </el-form-item>
  
  <el-form-item>
      <!-- <el-button  :plain="true" @click="submitForm(CookruleFormRef)" class="Registerd_btn">注册</el-button> -->
      <button class="Registerd_btn" @click="submitForm(CookruleFormRef)">注册</button>
      
  </el-form-item>
  
</el-form>
</div>
</div>
</template>

<script setup lang="ts">
import {ref,reactive,onMounted,watch} from 'vue';
import { Right } from '@element-plus/icons-vue';
import { useRouter,useRoute } from 'vue-router';
import {} from './registered'
import type { FormInstance,  } from 'element-plus';
import {ElMessage} from 'element-plus';
import { right } from '@popperjs/core';
import {saveDataFun_url } from '../../api/apis';
const router = useRouter();
const route = useRoute();

let registeredType=ref<any>(route.query.registeredType);
const ruleFormRef = ref<FormInstance>();
const CookruleFormRef= ref<FormInstance>();
let windowWidth = ref<number>(2000);


interface customerRegisterdType{
  CustomerName:string;
  PassWord:string;
  CheckPassWord:string;
  Phone:string ;
}
 const customerRegisterdData=reactive<customerRegisterdType>({
  CustomerName:'',
  PassWord:'',
  CheckPassWord:'',
  Phone:'',
})

interface sendCustomerRegisterdDataType{
   customerPhone:string,
   customerAccount:string,
   customerPassword:string
}

let sendCustomerRegisterdData = reactive<sendCustomerRegisterdDataType>({
  customerPhone:'',
  customerAccount:'',
  customerPassword:''
})

interface cookRegisterdType{
  CookName:string;
  PassWord:string;
  CheckPassWord:string;
  Phone:string ;
}
 const cookRegisterdData=reactive<cookRegisterdType>({
  CookName:'',
  PassWord:'',
  CheckPassWord:'',
  Phone:'',
})


window.onresize = () => {
    windowWidth.value = document.body.clientWidth
   console.log( windowWidth.value)

  if (windowWidth.value < 1140) {
  
   
  }}




//------------------------------------------------------
const checkPhone = (phone:string)=>{
  //发送ajax，验证此号码是否注册过
  
  customerRegisterdData.CustomerName="customer"+phone
}


////?????????
const toLoginPage=(formEl: FormInstance | undefined)=>{
 
  if (!formEl) return;
  formEl.resetFields();
  // console.log('formEl')
  router.push('/login')
}

const validatePhone = (rule: any, value: string,callback: any) => {
  if (customerRegisterdData.Phone==='') {
    return callback(new Error('请输入电话号码'))
  }else{
    callback()
  }
  
}

// const validateUsername = (rule: any, value: any,callback: any)=>{
//   if(customerRegisterdData.CustomerName===''){
//     callback(new Error('请设置用户名'))
//   }
// }

const validatePassword = ( rule: any, value: string,callback: any) => {
  if (customerRegisterdData.PassWord === '') {
    callback(new Error('请设置密码'))
  } else {
    if (customerRegisterdData.PassWord !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkpassword', () => null)
    }
    callback()
  }
}
const validateCheckpassword = (rule: any, value: string,callback: any) => {
  if (customerRegisterdData.CheckPassWord === '') {
    callback(new Error('请再次确认密码'))
  } else if (customerRegisterdData.CheckPassWord !== customerRegisterdData.PassWord) {
    callback(new Error("两次密码不一致"))
  } else {
    callback()
  }
}

const rules = reactive({
  // username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  checkpassword: [{ validator: validateCheckpassword, trigger: 'blur' }],
  phone:[{ validator: validatePhone, trigger: 'blur'}],

})

const submitForm =async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    console.log(valid)
    if (valid) {
      sendCustomerRegisterdData.customerPhone=customerRegisterdData.Phone;
      sendCustomerRegisterdData.customerAccount=customerRegisterdData.CustomerName;
      sendCustomerRegisterdData.customerPassword=customerRegisterdData.PassWord;

    saveDataFun_url({ configJson: JSON.stringify(sendCustomerRegisterdData) }).then((res)=>{   
      
    console.log(res)
    ElMessage({
    message: '注册成功',
    type: 'success',
  })
      }
       
      )
  
       



    // console.log('成功')
  
    } else {
    console.log('失败')
      return false
    }
  })
 
}

// ----------------------------------------------------------------------------------------------------

const validateCookphone = (rule: any, value: any, callback: any) => {
  if (cookRegisterdData.Phone==='') {
    return callback(new Error('请输入电话号码'))
  }else{
    callback()
  }
  
}

const checkCookPhone=(phone:string)=>{

cookRegisterdData.CookName="Cook"+phone

}
// const validateUsername = (rule: any, value: any,callback: any)=>{
//   if(customerRegisterdData.CustomerName===''){
//     callback(new Error('请设置用户名'))
//   }
// }

const validateCookpassword = (rule: any, value: any, callback: any) => {
  if (cookRegisterdData.PassWord === '') {
    callback(new Error('请设置密码'))
  } else {
    if (cookRegisterdData.PassWord !== '') {
      if (!CookruleFormRef.value) return
      CookruleFormRef.value.validateField('Cookcheckpassword', () => null)
    }
    callback()
  }
}
const validateCookcheckpassword = (rule: any, value: any, callback: any) => {
  if (cookRegisterdData.CheckPassWord === '') {
    callback(new Error('请再次确认密码'))
  } else if (cookRegisterdData.CheckPassWord !== cookRegisterdData.PassWord) {
    callback(new Error("两次密码不一致"))
  } else {
    callback()
  }
}

const Cookrules = reactive({
  // username: [{ validator: validateUsername, trigger: 'blur' }],
  Cookpassword: [{ validator: validateCookpassword, trigger: 'blur' }],
  Cookcheckpassword: [{ validator: validateCookcheckpassword, trigger: 'blur' }],
  Cookphone:[{ validator: validateCookphone, trigger: 'blur'}],

})




</script>

<style lang="less">
@import url("./registered.less");
</style>