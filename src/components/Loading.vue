<template>
	<div class="loading-box">
		<div class="loading-txt">loading</div>
		<i class="el-icon-loading primary"></i>
	</div>
</template>

<script>
	import {
		countryList,
		address
	} from '@/api/api'

	export default {
		name: 'Loading',
		data() {
			return {
				countryData: []
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
					_this.getLocalCountry()
				}).catch((e) => {})
			},

			// 获取当前国家
			getLocalCountry() {
				let _this = this
				address().then(res => {
					let cName = res.json.address.split(" ")[0]
					if (cName) {
						let arr = _this.countryData.map(item => item.CountryName)
						let flg = arr.indexOf(cName)
						if (flg > 0) {
							let countryData = _this.countryData
							for (let x in countryData) {
								if (cName == countryData[x].CountryName) {
									localStorage.setItem('cId', countryData[x].Id)
									localStorage.setItem('cName', countryData[x].CounteyShorthand)
									this.$router.push('/home')
								}
							}
						} else {
							_this.setDefaultCountry()
						}
					} else {
						_this.setDefaultCountry()
					}
				}).catch((e) => {
					_this.setDefaultCountry()
				})
			},

			//设置默认国家(国家列表最后一个国家为默认)
			setDefaultCountry() {
				let id = this.countryData[this.countryData.length - 1].Id
				let name = this.countryData[this.countryData.length - 1].CounteyShorthand
				localStorage.setItem('cId', id)
				localStorage.setItem('cName', name)
				this.$router.push('/home')
			}
		}
	}
</script>

<style>
	.loading-box {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 40px;
	}

	.loading-txt {
		font-size: 30px;
		color: #999999;
		margin-right: 15px;
	}
</style>
