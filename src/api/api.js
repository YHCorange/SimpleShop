import {
	get,
	post,
	postForm
} from './http'

export const address = (params) => get('/api/Ip/GetAddress', params) //获取当前位置

export const countryList = (params) => get('/api/Country/GetCountryList', params) //国家列表

export const typeList = (params) => get('/api/ProductType/GetProductTypeList', params) //商品分类列表

export const contactView = (params) => get('/api/CustomerService/GetCustomerService', params) //联系方式获取

export const goodsList = (params) => get('/api/ProductManage/GetProductManageList', params) //商品列表

export const bannerList = (params) => get('/api/Rotation/GetRotationList', params) //轮播图列表

export const noticeView = (params) => get('/api/Notice/GetNotice', params) //系统公告获取
