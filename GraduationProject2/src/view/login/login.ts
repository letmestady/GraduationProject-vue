import {ref} from 'vue'

//表单验证规则
// export const addSceneRules = {
//   sceneName: [
//       { required: true, message: '请输入场景名称', trigger: 'blur' },
//       { min: 1, max: 20, message: '场景名称字符长度不得超过20', trigger: 'blur' },
//       { validator: checkName, trigger: 'blur' }
//   ],
//   sceneImgUrl: [
//       { validator: checkImg, trigger: 'change' }
//   ],

// }

export const getRoundNumber=(f: undefined | number,s:undefined | number,sum:undefined | number)=>{
  f=Math.round(Math.random()*9);
  s=Math.round(Math.random()*9);
  sum=f+s;
  return {f,s,sum};
  }