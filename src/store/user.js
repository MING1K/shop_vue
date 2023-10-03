import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api';
import { getUUID } from '@/utils/uuid';
import { setToken, getToken, removeToken } from '@/utils/token';

const state = {
    // 游客身份
    uuid_token: getUUID(),
    // 验证码
    code: '',
    token: getToken(),
    userInfo: {},
    // username: null,
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, data) {
        state.token = data.token;
        setToken(data.token);
    },
    GETUSERINFO(state, data) {
        state.userInfo = data;
    },
    CLEARUSERINFO(state) {
        state.userInfo = {};
        state.token = null;
        removeToken();
    }
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code === 200) {
            commit('GETCODE', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    // 注册
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    // 登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        //服务器下发token，用户唯一标识符(uuid)
        //将来经常通过带token找服务器要用户信息进行展示
        if (result.code === 200) {
            commit('USERLOGIN', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code === 200) {
            commit('GETUSERINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
       }
    },
    // 退出登录
    async userLogout({ commit }) {
        let result = await reqLogout();
        if (result.code === 200) {
            commit('CLEARUSERINFO');
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    }
};
const getters = {
    code: state => state.code,
    userInfo: state => state.userInfo,
    username: state => state.userInfo.nickName || null,
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}