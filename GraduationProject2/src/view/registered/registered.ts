import {ref,reactive, provide} from 'vue';

interface customerRegisterdType{
  CustomerName:string;
  PassWord:string;
  CheckPassWord:string;
  Phone:string ;
}
export const customerRegisterdData=reactive<customerRegisterdType>({
  CustomerName:'',
  PassWord:'',
  CheckPassWord:'',
  Phone:'',
})

interface cookRegisterdType{
  CookName:string;
  PassWord:string;
  CheckPassWord:string;
  Phone:string ;
}
export const cookRegisterdData=reactive<cookRegisterdType>({
  CookName:'',
  PassWord:'',
  CheckPassWord:'',
  Phone:'',
})

const RegisterdData=()=>{

  provide('customerRegisterdData',customerRegisterdData);
  provide('cookRegisterdData',cookRegisterdData);
}

export{
  RegisterdData,
}