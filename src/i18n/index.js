import { createI18n } from 'vue-i18n';
import mZhLocale from './lang/zh_CN';
import mEnLocale from './lang/en_US';
import store from '@/store';

const messages = {
  en_US: {
    msg: {
      ...mEnLocale,
    },
  },
  zh_CN: {
    msg: {
      ...mZhLocale,
    },
  },
};

// const locale = 'zh_CN';
/**
 * 返回当前 lang
 */
function getLanguage() {
  return store && store.getters && store.getters.language;
}

const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: getLanguage(),
  messages,
});

export default i18n;
