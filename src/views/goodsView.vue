<template>
	<div class="goodsView">
		<el-row :gutter="100">
			<el-col :xs="24" :sm="10">
				<img class="goodsImage" :src="goodsInfo.image" />
				<ul class="goods-imgs">
					<li v-for="item in goodsInfo.allImage" @click="changeImg(item)"><img class="goodsImage" :src="item" /></li>
				</ul>
			</el-col>
			<el-col :xs="24" :sm="14">
				<div class="goodsViewTitle">{{goodsInfo.name}}</div>
				<div class="goodsViewPrice warning text-line-x">{{goodsInfo.price}} {{goodsInfo.currency}}</div>
				<div class="goodsViewDis" v-html="goodsInfo.description"></div>
				<div class="contact" v-html="contact"></div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {
		goodsList,
		contactView
	} from '@/api/api'

	export default {
		name: 'goodsView',
		data() {
			return {
				goodsData: [],
				goodsInfo: {
					name: '',
					country: '',
					type: '',
					price: '',
					currency: '',
					description: '',
					image: '',
					allImage: []
				},
				contact: ''
			}
		},
		created() {
			this.getGoodsData()
			this.getContactData()
		},
		methods: {
			// 获取商品列表数据
			getGoodsData() {
				let _this = this
				let cId = localStorage.getItem('cId')
				let params = {
					countryId: cId,
					productTypeId: 0,
					Name: '',
					State: 0,
					pageIndex: 1,
					pageSize: 100000000
				}
				goodsList(params).then(res => {
					let all = res.Entity
					let data = []
					for (let x in all) {
						if (all[x].State == 1) {
							data.push(all[x])
						}
					}
					_this.goodsData = data

					_this.goodsDetails(data)

				}).catch((e) => {})
			},

			//查看商品详情
			goodsDetails(data) {
				let _this = this
				let id = _this.$route.query.id
				for (let x in data) {
					if (data[x].Id == id) {
						_this.goodsInfo.name = data[x].ProductName
						_this.goodsInfo.price = data[x].Price
						_this.goodsInfo.currency = data[x].Currency
						_this.goodsInfo.description = data[x].ProductDescribe
						if (data[x].ProductUrl) {
							_this.goodsInfo.image = data[x].ProductUrl
						}
						if (data[x].Url) {
							let all = data[x].ProductUrl + ',' + data[x].Url
							let arr = all.split(",")
							_this.goodsInfo.allImage = arr
						}
					}
				}
			},

			// 切换图片
			changeImg(img) {
				let _this = this
				_this.goodsInfo.image = img
			},

			//获取联系方式
			getContactData() {
				let _this = this
				let cId = localStorage.getItem('cId')
				let params = {
					CountryId: cId
				}
				contactView(params).then(res => {
					_this.contact = res.Entity[0].Contact
				}).catch((e) => {})
			},

		}
	}
</script>

<style scope>
	.goodsView {
		width: 70%;
		margin: 0 auto;
		background: #FFFFFF;
		padding: 30px;
	}

	.goodsImage {
		width: 100%;
	}

	.goodsViewTitle {
		font-size: 24px;
	}

	.goodsViewPrice {
		font-size: 30px;
		font-weight: bold;
		margin-top: 30px;
	}

	.goodsViewDis {
		font-size: 16px;
		color: #999999;
		margin-top: 30px;
	}

	.goods-imgs {
		list-style: none;
		padding: 0;
		margin: 0;
		margin-top: 15px;
		margin-left: -5px;
	}

	.goods-imgs li {
		width: 14%;
		float: left;
		margin: 5px;
		cursor: pointer;
		border: 1px solid #F1F1F1;
	}

	.contact {
		margin-top: 30px;
		font-size: 18px;
	}
</style>
