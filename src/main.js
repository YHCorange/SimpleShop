import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import '@/assets/css/style.scss'
import router from './routes'

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
	let cId = localStorage.getItem('cId')
	if (!cId && to.path !== '/loading') {
		next('/loading')
	} else {
		next()
	}
})

new Vue({
	el: '#app',
	router,
	render: h => h(App)
}).$mount('#app')
