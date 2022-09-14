import { login, getUserInfo } from '@/api/sys';
import md5 from 'js-md5';
import { setItem, getItem } from '@/utils/storage';
import { TOKEN } from '@/constant';
import router from '@/router';
import { removeAllItem } from '../../utils/storage';
import { setTimeStamp } from '@/utils/auth';

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {},
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
      setItem(TOKEN, token);
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    /**
     * 登录请求动作
     * @param {*} context
     * @param {*} userInfo 用户登录信息
     * @returns
     */
    login(context, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password),
        })
          .then((data) => {
            this.commit('user/setToken', data.token);
            // 保存登录时间
            setTimeStamp();
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    /**
     * 获取用户信息
     * @returns {Promise<*>}
     */
    async getUserInfo() {
      const res = await getUserInfo();
      this.commit('user/setUserInfo', res);
      return res;
    },
    /**
     * 退出登录
     */
    logout() {
      this.commit('user/setToken', '');
      this.commit('user/setUserInfo', {});
      removeAllItem();
      router.push('/login');
    },
  },
};
