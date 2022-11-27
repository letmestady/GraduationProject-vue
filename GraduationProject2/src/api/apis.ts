
import { npost } from "./http"

export const saveDataFun_url = (p: any) => npost('http://127.0.0.1:80/customerLogin/customerRegistered', p) //保存数据
