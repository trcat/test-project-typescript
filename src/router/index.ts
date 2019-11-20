import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import FindPassword from '@/views/FindPassword.vue';
import ModifyPassword from '@/views/ModifyPassword.vue';
import User from '@/views/User.vue';
import UserProfile from '@/views/UserProfile.vue';
import AddAccount from '@/views/AddAccount.vue';
import EditAccount from '@/views/EditAccount.vue';
import AddClass from '@/views/AddClass.vue';
import EditClass from '@/views/EditClass.vue';

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
    meta: {
      activeMenu: '/user',
    },
    children: [
      {
        path: '',
        component: UserProfile,
        meta: {
          activeMenu: '/user',
          subActiveMenu: '/User',
        },
      }, {
        path: 'add-account',
        component: AddAccount,
        meta: {
            activeMenu: '/user',
            subActiveMenu: '/user/add-account',
        },
      }, {
        path: 'edit-account',
        component: EditAccount,
        meta: {
            activeMenu: '/user',
            subActiveMenu: '/user/edit-account',
        },
      }, {
        path: 'add-class',
        component: AddClass,
        meta: {
            activeMenu: '/user',
            subActiveMenu: '/user/add-class',
        },
      }, {
        path: 'edit-class',
        component: EditClass,
        meta: {
            activeMenu: '/user/',
            subActiveMenu: '/user/edit-class',
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
