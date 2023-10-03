// 登录保存用户令牌
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token);
};

// 获取Token
export const getToken = () => localStorage.getItem('TOKEN');

// 清除Token
export const removeToken = () => {
    localStorage.removeItem('TOKEN');
};