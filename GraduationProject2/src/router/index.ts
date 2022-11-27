import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw>=[
  {
    path:'/login',
    name:'login',
    component:()=>import('../view/login/login.vue')

  },
  {
    path:'/',
    name:'homePage',
    component:()=>import('../view/homePage/homePage.vue')
  },
  {
    path:'/registered',
    name:'registered',
    component:()=>import('../view/registered/registered.vue')
  }
]
const router = createRouter({
  history:createWebHistory(),
  routes
})
//路由导航守卫
router.beforeEach((to,from,next)=>{
//验证token，只有存在token的时候，才能跳转主页
let token = localStorage.getItem("token");
if(token || to.path==="/login" || to.path==="/registered" ){
  next();
}else{
 
  next("/login")
 
}
})

export default router