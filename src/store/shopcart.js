import { reqCartList, reqDeleteCart, reqUpdateCheckedByid } from '@/api';

const state = {
    cartList: [],
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList || [];
    }
};
const actions = {
    // 获取购物车数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code === 200) {
            commit('GETCARTLIST', result.data);
        }
    },
    // 删除购物车商品
    async deleteCart({ commit }, skuId) {
        let result = await reqDeleteCart(skuId);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    // 修改商品选中状态
    async updateCheckedByid({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    deleteCheckedCart({ dispatch }, checked) {
        let arr = [];
        checked.forEach(item => {
            let ps = dispatch('deleteCart', item.skuId);
            arr.push(ps);
        })
        return Promise.all(arr);
    },
    changeAllChecked({ dispatch }, { checked, isAllChecked }) {
        let arr = [];
        let isChecked = isAllChecked ? 0 : 1;
        checked.forEach(item => {
            let ps = dispatch('updateCheckedByid', { skuId: item.skuId, isChecked: isChecked });
            arr.push(ps);
        })
        return Promise.all(arr);
    },
};
const getters = {
    cartInfoList(state) {
        return state.cartList?.[0]?.cartInfoList || [];
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}