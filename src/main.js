import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuex from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 导入全局样式
import './style/index.scss';

// 导入 svgIcon
import SvgIcon from './components/SvgIcon/index.vue';

// 导入权限控制模块
import './permission';

const app = createApp(App);
app.component('SvgIcon', SvgIcon);
app.use(ElementPlus).use(router).use(vuex);
app.mount('#app');
