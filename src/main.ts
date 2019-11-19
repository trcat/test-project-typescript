import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as ElementUI from 'element-ui';
import './assets/style/theme/index.css';
import './scss/main.scss';

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    // 防止重新加载页面后 store.state.user 数据被重置
    if (sessionStorage.getItem('userData')) {
        this.$store.commit('updateUser', JSON.parse(sessionStorage.getItem('userData') as string));
        sessionStorage.removeItem('userData');
    }

    window.addEventListener('beforeunload', () => {
        if (this.$store.state.user) {
          sessionStorage.setItem('userData', JSON.stringify(this.$store.state.user));
        }
    });
  },
}).$mount('#app');
