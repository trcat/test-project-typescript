import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import FindPassword from '@/views/FindPassword.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: Login,
  }, {
    path: '/',
    redirect: '/login',
  }, {
    path: '/find-password',
    component: FindPassword,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
