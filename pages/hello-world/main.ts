import { createApp } from 'vue'
import router from './router'
import root from './App.vue'
// import '/@/sdk/flexible'

const app = createApp(root)

app.use(router)
app.mount('#app')
