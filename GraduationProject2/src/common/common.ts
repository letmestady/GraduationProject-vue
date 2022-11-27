import {reactive, ref} from 'vue';

interface customerLoginDataType{
  readyStatus:number;
  status:number;
  responseText:string;
  UserName:string;
  PassWord:string;
  CheckPassWord:string;
  Phone:string ;
}

let LoginType = ref<any>(
  {
    CustomerLoginStatus:false,
    CookLoginStatus:false
  }
)



export const customerLoginData=reactive<customerLoginDataType>({
  readyStatus:0,
  status:0,
  responseText:'',
  UserName:'张三',
  PassWord:'123',
  CheckPassWord:'',
  Phone:'',
})

export const LoginFn=(UserNameValue:string,PassWordValue:string)=>{
            
  if(UserNameValue != customerLoginData.UserName){
   console.log('账号错误')
  
} else  if(PassWordValue !=customerLoginData.PassWord){
  console.log('密码错误')
}else{
let token = JSON.stringify(Math.round(Math.random()*6));
//账号密码正确存token
localStorage.setItem('token',token);
console.log(token)
customerLoginData.readyStatus=4;
customerLoginData.status=250;
// setTimeout(()=>{
//   localStorage.setItem('token','');
// },10000)
}
  }


  interface cookLoginDataType{
    
    cookName:string;
    cookPassWord:string;
    cookCheckPassWord:string;
    cookPhone:string ;
  }


export const cookLoginData=reactive<customerLoginDataType>({
  readyStatus:0,
  status:0,
  responseText:'',
  UserName:'',
  PassWord:'',
  CheckPassWord:'',
  Phone:'',
})

  

export{
  LoginType,
}

