import Vue from 'vue'
const requriedContext = require.context(
  './global',
  true,
  /\.vue$/
)
requriedContext.keys().forEach(filename => {
  const componentConfig = requriedContext(filename)
  Vue.component(
    componentConfig.default.name || componentConfig.name,
    componentConfig.default || componentConfig
  )
})
