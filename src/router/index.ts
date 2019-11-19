import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import FindPassword from '@/views/FindPassword.vue';
import ModifyPassword from '@/views/ModifyPassword.vue';
import User from '@/views/User.vue';

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
  }, {
    path: '/modify-password',
    component: ModifyPassword,
  }, {
    path: '/user',
    component: User,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
