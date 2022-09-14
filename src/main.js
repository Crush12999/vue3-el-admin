import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 导入全局样式
import './style/index.scss';

// 导入 svgIcon
import SvgIcon from './components/SvgIcon/index.vue';

const app = createApp(App);
app.component('SvgIcon', SvgIcon);
app.use(ElementPlus).use(router);
app.mount('#app');
