<template>
	<div>
		<div class="goodsSearchBox">
			<el-form :model="searchForm" label-width="150px">
				<el-row>
					<el-col :xs='24' :md="8">
						<el-form-item label="Product Name">
							<el-input v-model="searchForm.name" placeholder="Please enter the product name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs='24' :md="8">
						<el-form-item label="Product category">
							<el-select v-model="searchForm.type" placeholder="Please enter product category" style="width: 100%;">
								<el-option value="0" label="All category"></el-option>
								<el-option v-for="item in typeData" :key="item.Id" :label="item.EnglishName" :value="item.Id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs='24' :md="8">
						<el-form-item style="margin-left: -150px;">
							<el-button @click="searchData" icon="el-icon-search">Search</el-button>
							<el-button @click="resetSearch" icon="el-icon-refresh">Reset</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>

		<div v-infinite-scroll="load" class="goodsBox">
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
		</div>
	</div>
</template>

<script>
	import {
		goodsList,
		typeList
	} from '@/api/api'

	export default {
		name: 'goods',
		data() {
			return {
				goodsData: [],
				typeData: [],
				pageSize: 48,
				searchForm: {
					name: '',
					type: '0'
				}
			}
		},
		created() {
			this.getGoodsData()
			this.getTypeData()
		},
		methods: {
			// 获取商品列表数据
			getGoodsData() {
				let _this = this
				let cId = localStorage.getItem('cId')
				let params = {
					countryId: cId,
					productTypeId: _this.searchForm.type,
					Name: _this.searchForm.name,
					State: 0,
					pageIndex: 1,
					pageSize: _this.pageSize
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

			//查询
			searchData() {
				let _this = this
				_this.pageIndex = 1
				_this.getGoodsData()
			},

			//重置
			resetSearch() {
				let _this = this
				_this.pageIndex = 1
				_this.searchForm = {
						name: '',
						type: '0',
					},
					_this.getGoodsData()
			},

			// 获取商品类别
			getTypeData() {
				let _this = this
				let params = {
					Name: '',
					pageIndex: 1,
					pageSize: 100000000
				}
				typeList(params).then(res => {
					_this.typeData = res.Entity
				}).catch((e) => {})
			},

			//查看商品详情
			goodsView(id) {
				this.$router.push({
					path: '/goodsView',
					query: {
						id: id
					}
				})
			},

			//滚动无限加载
			load() {
				this.pageSize += 24
				this.getGoodsData()
			}

		}
	}
</script>

<style scope>
	.goodsSearchBox {
		text-align: center;
		padding-top: 20px;
		background: #FFFFFF;
	}

	.goodsSearchBox .el-form--inline .el-form-item__content {
		vertical-align: middle !important
	}

	.goodsBox {
		height: calc(100vh - 250px);
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
