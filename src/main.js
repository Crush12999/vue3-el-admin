import { createApp } from 'vue';
import i18n from '@/i18n';
import App from './App.vue';
import router from './router';
import vuex from './store';
import installElementPlus from './plugins/element';
// import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 导入全局样式
import './style/index.scss';
// 注册所有 element-plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 导入 svgIcon
import SvgIcon from './components/SvgIcon/index.vue';
// 导入权限控制模块
import './permission';

const app = createApp(App);
installElementPlus(app);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component('SvgIcon', SvgIcon);
// app.use(ElementPlus);
app.use(router).use(vuex).use(i18n);
app.mount('#app');
