<template>
	<el-container>
		<el-header>
			<el-menu :default-active="onRoutes" background-color="#001529" text-color="#fff" active-text-color="#5FB878" mode="horizontal"
			 unique-opened router>
				<el-menu-item @click="$router.push({path: 'home'})" style="border: none;">
					<img class="logImg" src="../assets/image/logo.png" />
				</el-menu-item>
				<el-menu-item index="home" style="border: none;">HOME</el-menu-item>
				<el-dropdown split-button type="warning" class="f-r" style="margin:10px 20px" @command="handleCommand">
					<span>{{countryName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item v-for="item in countryData" :command="item.Id+','+item.CounteyShorthand">{{item.CounteyShorthand}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-menu>
		</el-header>
		<el-container>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
		<el-footer>2020-2030 © Copyright By AmzBuy</el-footer>
	</el-container>
</template>

<script>
	import {
		countryList
	} from '@/api/api'

	export default {
		name: 'Main',
		data() {
			return {
				countryData: [],
				countryName: localStorage.getItem('cName')
			}
		},
		computed: {
			onRoutes() {
				return this.$route.path.replace('/', '')
			}
		},

		created() {
			this.getCountryData()
		},

		methods: {
			// 获取国家数据
			getCountryData() {
				let _this = this
				let params = {
					Name: '',
					pageIndex: 1,
					pageSize: 100000000
				}
				countryList(params).then(res => {
					_this.countryData = res.Entity
				}).catch((e) => {})
			},

			// 切换国家
			handleCommand(command) {
				let info = command.split(",")
				let cId = info[0]
				let cName = info[1]
				localStorage.setItem('cId', cId)
				localStorage.setItem('cName', cName)

				this.$router.push('/home')
				window.location.reload()
			}

		}
	}
</script>
