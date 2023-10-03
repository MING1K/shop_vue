import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api';

const state = {
    goodInfo: {},
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
};
const actions = {
    // 获取产品信息
    async getGoodInfo({ commit }, skuid) {
        let result = await reqGoodsInfo(skuid);
        if (result.code === 200) {
            commit('GETGOODINFO', result.data);
        }
    },
    // 将产品添加到购物车
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // console.log(obj)
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
};
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || {};
    },
    goodPrice(state) {
        return state.goodInfo.price || 0;
    },
    valuesSkuJson(state) {
        return state.goodInfo.valuesSkuJson || '';
    },
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}