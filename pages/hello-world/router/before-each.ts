import type { Router } from 'vue-router'

const beforeEach = (router: Router) => {
  router.beforeEach(async (to, form, next) => {
    if (to.meta?.title) {
      document.title = to.meta.title as string
    }
    next()
  })
}

export default beforeEach
