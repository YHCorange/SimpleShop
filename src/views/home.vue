<template>
	<div>
		<el-carousel :height="bannerHeight+'px'" trigger="click">
			<el-carousel-item v-for="item in bannerData" :key="item.Id">
				<a :href="item.Link" target="_blank"><img class="banner-img" ref="bannerHeight" :src="item.Image"></a>
			</el-carousel-item>
		</el-carousel>
		<el-row :gutter="30">
			<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="3" v-for="item in goodsData" :key="item.Id">
				<el-card class="product-card goods-card" shadow="hover" @click.native="goodsView(item.Id)">
					<img class="product-img" :src="item.ProductUrl">
					<div class="product-card-box">
						<div class="goods-title">{{item.ProductName}}</div>
						<div class="goods-dis">{{item.ProductName}}</div>
						<div class="bottom">
							<time class="time warning fz20">{{item.Price}} {{item.Currency}}</time>
							<el-button type="text" class="button ml20">View details</el-button>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<div class="txt-c mt20">
			<el-button type="warning" @click="goodsAll">View more goods</el-button>
		</div>
	</div>
</template>

<script>
	import {
		bannerList,
		goodsList
	} from '@/api/api'

	export default {
		name: 'home',
		data() {
			return {
				bannerHeight: '',
				bannerData: [],
				goodsData: []
			}
		},
		created() {
			this.getBannerData()
			this.getGoodsData()
		},
		mounted() {
			// 处理banner图片高度自适应问题
			this.bannerLoad()
			window.addEventListener('resize', () => {
				this.bannerHeight = this.$refs.bannerHeight[0].height
			}, false)
		},
		methods: {
			// 处理banner图片高度自适应问题
			bannerLoad() {
				this.$nextTick(() => {
					this.bannerHeight = document.body.clientWidth * 1 / 4
				})
			},

			//获取banner
			getBannerData() {
				let _this = this
				let cId = localStorage.getItem('cId')
				let params = {
					Name: cId,
					pageIndex: 1,
					pageSize: 100000000
				}
				bannerList(params).then(res => {
					let all = res.Entity
					let data = []
					for (let x in all) {
						if (all[x].State == 1) {
							data.push(all[x])
						}
					}
					_this.bannerData = data
					_this.bannerLoad()
				}).catch((e) => {})
			},

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
					pageSize: 16
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
				}).catch((e) => {})
			},

			//查看所有商品
			goodsAll() {
				this.$router.push({
					path: '/goods'
				})
			},

			//查看商品详情
			goodsView(id) {
				this.$router.push({
					path: '/goodsView',
					query: {
						id: id
					}
				})
			}

		}
	}
</script>
