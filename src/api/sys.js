import request from '@/utils/request';

/**
 * 登录
 * @param {*} data
 * @returns
 */
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data,
  });
};
