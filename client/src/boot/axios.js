import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

export default defineBoot(({ app }) => {
  const api = axios.create({ baseURL: '' })

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { axios as $axios }
