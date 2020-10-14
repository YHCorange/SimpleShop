<template>
	<div>
		<div class="notice" v-if="notice">
			<div class="animate" v-html="notice"></div>
		</div>
		<el-row class="top-box">
			<el-col :span="7">
				<div class="left-con">After you leave a five-star review, we will refund in full. Ok? Including PP costs. You agree
					that I will send you keywords and product pictures! However, please do not refund the return! If you do, it will
					be serious</div>
			</el-col>
			<el-col :span="10">
				<p>&nbsp;</p>
				<el-carousel type="card" height="300" trigger="click" v-if="bannerData.length>0" class="mt20">
					<el-carousel-item v-for="item in bannerData" :key="item.Id">
						<a :href="item.Link" target="_blank"><img class="banner-img" ref="bannerHeight" :src="item.Image"></a>
					</el-carousel-item>
				</el-carousel>
			</el-col>
			<el-col :span="7">
				<div class="right-con">Our working hours are from 9 pm Los Angeles time to 8:30 am the next day. Please contact me
					during this time. All contact information is placed in the product interface!</div>
			</el-col>
		</el-row>
		<el-row :gutter="30">
			<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="3" v-for="item in goodsData" :key="item.Id">
				<el-card class="product-card goods-card" shadow="hover" @click.native="goodsView(item.Id)">
					<el-badge value="free" class="item mr15">
						<img class="product-img" :src="item.ProductUrl">
					</el-badge>
					<div class="product-card-box">
						<div class="goods-title">{{item.ProductName}}</div>
						<div class="goods-dis" v-html="item.ProductDescribe"></div>
						<div class="goods-bottom">
							<div class="time info fz16 text-line-x">{{item.Price}}{{item.Currency}}</div>
							<div class="time danger fz18">（free）</div>
							<div class="time warning fz18">0{{item.Currency}} </div>
						</div>
						<div class="txt-c">
							<el-button type="text" class="button">View details</el-button>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<div class="txt-c mt20">
			<el-button type="warning" plain @click="goodsAll" v-if="total>16" style="width: 100%;">View more products</el-button>
		</div>
	</div>
</template>

<script>
	import {
		bannerList,
		goodsList,
		noticeView
	} from '@/api/api'

	export default {
		name: 'home',
		data() {
			return {
				bannerHeight: '',
				bannerData: [],
				goodsData: [],
				total: 0,
				notice: ''
			}
		},
		created() {
			this.getNoticeData()
			this.getBannerData()
			this.getGoodsData()
		},
		methods: {
			// 获取公告数据
			getNoticeData() {
				let _this = this
				let cId = localStorage.getItem('cId')
				let params = {
					CountryId: cId
				}
				noticeView(params).then(res => {
					_this.notice = res.Entity[0].Message
				}).catch((e) => {})
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
					State: 1,
					pageIndex: 1,
					pageSize: 16
				}
				goodsList(params).then(res => {
					_this.goodsData = res.Entity
					_this.total = Number(res.TotalCount)
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

<style>
	.notice {
		width: 100%;
		overflow: hidden;
		margin-bottom: 5px;
	}

	.top-box {
		background-image: linear-gradient(to top, #5ee7df 0%, #b490ca 100%);
	}

	.left-con,
	.right-con {
		font-size: 20px;
		color: #FFFFFF;
		padding: 15px;
		height: 250px;
		line-height: 1.8;
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	.animate {
		display: inline-block;
		white-space: nowrap;
		animation: 100s wordsLoop linear infinite normal;
	}

	@keyframes wordsLoop {
		0% {
			transform: translateX(200px);
			-webkit-transform: translateX(200px);
		}

		100% {
			transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
		}
	}
</style>
