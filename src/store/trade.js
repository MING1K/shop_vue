import { reqAddressInfo, reqOrderInfo } from '@/api';

const state = {
    addressList: [], // 收货人信息
    orderInfo: {}, // trade信息
    tradeList: [], // 商品清单
    addressChecked: {}, // 选择的地址
    payWay: [
        { name: '在线支付', code: 'ONLINE', isDefault: 1 },
        { name: '货到付款', code: 'afterArrive', isDefault: 0 },
    ],
    transWay: [
        { name: '天天快递', code: 'dayTrans', time: '预计8月10日（周三）09:00-15:00送达', isDefault: 1 },
        { name: '同城配送', code: 'commonTrans', time: '预计8月8日（周一）09:00-15:00送达', isDefault: 0 },
    ],
};
const mutations = {
    GETUSERADDRESS(state, list) {
        state.addressList = list;
    },
    GETORDERINFO(state, data) {
        state.orderInfo = data
        state.tradeList = data.detailArrayList;
    },
};
const actions = {
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        if (result.code === 200) {
            commit('GETUSERADDRESS', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.msg));
        }
    },
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if (result.code === 200) {
            commit('GETORDERINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.msg));
        }
    },
};
const getters = {
    addressList: state => state.addressList,
    tradeList: state => state.tradeList,
    totalNum: state => state.orderInfo.totalNum,
    totalAmount: state => state.orderInfo.totalAmount,
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}