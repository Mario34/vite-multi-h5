import { createApp, defineComponent, h } from 'vue'

const App = defineComponent({
  render() {
    return h('div', [h('span', 'wx-authorization todo')])
  },
})

createApp(App).mount('#app')
