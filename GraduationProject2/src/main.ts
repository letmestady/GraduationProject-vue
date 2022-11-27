import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

//按需引入ui
import ElementPlusUI from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue  from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

createApp(App).use(router).use(ElementPlusUI).mount('#app')
