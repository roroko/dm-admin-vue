import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/index');

/* dashboard */
const Dashboard = _import('dashboard/index');

/* error page */
const Err404 = _import('404');

/* demo page */
const Form = _import('page/form');
const Table = _import('table/index');

Vue.use(Router);

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: Err404, hidden: true },
   {
     path: '/',
     component: Layout,Dashboard,
     redirect: '/home/index',
     icon: 'home',
     noDropdown:true,
     children:[
       {
         path:'home/index',component:_import('dashboard/index'),name: 'Home'
       }
     ]
   }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/dataSets',
    component: Layout,
    redirect: '/dataSets/index',
    name: 'Data Sets',
    icon: 'data' ,
    children:[
    {
      path: 'index', component: _import('datasets/index'),name: 'Abstract',icon: 'table'
    },
    {
      path: 'upload', component: _import('datasets/upload'),name: 'Upload'
    },
      {
        path: 'edit', component: _import('datasets/edit'),name: 'Edit'
      }
    ]
  },
  {
    path:'/students',
    component: Layout,
    redirect: '/students/index',
    name: 'Students',
    icon: 'bussinessman',
    children:[
      {
        path: 'index',component: _import('students/index'),name: 'Students Information'
      }
    ]
  },
  {
    path: '/tasks',
    component: Layout,
    redirect: '/tasks/index',
    name:"Data Mining Tasks",
    icon: 'task-management',
    children: [
      {
        path: 'index',component: _import('tasks/index')
      }
    ]
  },
  // {
  //   path: '/table',
  //   component: Layout,
  //   redirect: '/table/index',
  //   name: 'Table',
  //   icon: 'tubiaoleixingzhengchang',
  //   noDropdown: true,
  //   children: [{ path: 'index', component: Table, name: 'Table', meta: { role: ['admin'] } }]
  // },
  { path: '*', redirect: '/404', hidden: true }
];
