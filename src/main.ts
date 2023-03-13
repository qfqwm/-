import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElemenetUi from 'element-plus'
import 'element-plus/dist/index.css'
import dd from './store/index'  //vuex状态管理侧边栏，根据不同角色进入不同页面
const app = createApp(App)
app.use(router)
app.use(ElemenetUi)
app.use(dd)

// const whileList = ['/'] //添加白名单，使之可以跳转登陆页面

// router.beforeEach((to,from,next)=>{
//     if(whileList.includes(to.path) || localStorage.getItem('token')){
//         next() //跳转下一个页面
//     }else{
//         next('/') //返回登陆页面
//     }
// })

app.mount('#app')
