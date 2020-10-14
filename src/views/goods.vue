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

		<div class="goodsBox">
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
			<el-row class="mt30 turn-page">
				<el-col :span="24">
					<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex"
					 :page-size="48" layout="total, prev, pager, next, jumper" :total="total">
					</el-pagination>
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
				pageIndex: 1,
				pageSize: 48,
				total: 0,
				goodsData: [],
				typeData: [],
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
					State: 1,
					pageIndex: _this.pageIndex,
					pageSize: _this.pageSize
				}
				goodsList(params).then(res => {
					_this.goodsData = res.Entity
					_this.total = Number(res.TotalCount)
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

			//翻页
			handleSizeChange(val) {
				let _this = this
				_this.pageSize = val
				_this.getGoodsData()
			},

			//跳转
			handleCurrentChange(val) {
				let _this = this
				_this.pageIndex = val
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

	.turn-page {
		background: #FFFFFF;
		padding: 5px;
	}
</style>
