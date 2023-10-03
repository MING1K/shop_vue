import { reqGetSearchInfo } from '@/api/index.js';
// search模块小仓库
const state = {
    searchList: {},
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    // 获取search模块数据
    getSearchList({commit}, data) {
        // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象)
        // params形参:是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        return reqGetSearchInfo(data).then(
            res => {
                if (res.code === 200) {
                    commit("GETSEARCHLIST", res.data);
                } else {
                    console.log('error');
                }
                return res;
            });
    }
};
// 计算属性， 为了简化仓库中的数据， 便于后续获取数据
const getters = {
    // 当前形参state， 是当前仓库中的state，而不是大仓库中的state
    goodsList(state) {
        // 当不确定state中存储的是数组还是对象时会出现问题
        // 假如网络不给力或没有网state.searchList.goodsList应该返回的是undefined，索引这里使用 || [] 让他始终是数组
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}