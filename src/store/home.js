import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";
// home模块小仓库
const state = {
    // state中数据默认初始值不能乱写，服服务器返回对象/服务器返回数组。【根据接口返回值初始化的】
    categoryList:[],
    // 首页轮播图数据
    bannerList:[],
    // floor组件数据
    floorList: [],
};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
const actions = {
    // 通过API里面的接口的数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        // console.log(result)
        if(result.code===200){
            commit("CATEGORYLIST",result.data)
        }
    },
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        // console.log(result)
        if(result.code===200){
            commit("BANNERLIST",result.data)
        }
    },
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code===200){
            commit('GETFLOORLIST', result.data)
        }
    },
};
const getters = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}