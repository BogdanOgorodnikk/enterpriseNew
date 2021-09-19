import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Town',
    meta: {layout: 'main'},
    component: () => import('../views/Town.vue'),
  },
  {
    path: '/townpith/:id',
    name: 'Town-pith',
    meta: {layout: 'main'},
    component: () => import('../views/TownPith.vue'),
  },
  {
    path: '/townclients/:id',
    name: 'Town-clients',
    meta: {layout: 'main'},
    component: () => import('../views/TownClients.vue'),
    props: true
  },
  {
    path: '/client/:id',
    name: 'Clients',
    meta: {layout: 'main'},
    component: () => import('../views/Client.vue'),
  },
  {
    path: '/clientpith/:id',
    name: 'Client-pith',
    meta: {layout: 'main'},
    component: () => import('../views/ClientPith.vue'),
  },
  {
    path: '/allselers',
    name: 'all-selers',
    meta: {layout: 'main'},
    component: () => import('../views/AllSelers.vue'),
  },
  {
    path: '/allpith',
    name: 'all-pith',
    meta: {layout: 'main'},
    component: () => import('../views/AllPith.vue'),
  },
  {
    path: '/managermoney',
    name: 'manager-money',
    meta: {layout: 'main'},
    component: () => import('../views/ManagerMoneyList.vue'),
  },
  {
    path: '/managermoney/:id',
    name: 'manager-moneys',
    meta: {layout: 'main'},
    component: () => import('../views/ManagerMoney.vue'),
  },
  {
    path: '/paymentcash',
    name: 'payment-cash',
    meta: {layout: 'main'},
    component: () => import('../views/PaymentCash.vue'),
  },
  {
    path: '/paymentcashless',
    name: 'payment-cashless',
    meta: {layout: 'main'},
    component: () => import('../views/PaymentCashless.vue'),
  },
  {
    path: '/clientsdebt',
    name: 'clients-debt',
    meta: {layout: 'main'},
    component: () => import('../views/ClientsDebt.vue'),
  },
  {
    path: '/allusers',
    name: 'all-users',
    meta: {layout: 'main'},
    component: () => import('../views/AllUsers.vue'),
  },
  {
    path: '/create/town',
    name: 'create-town',
    meta: {layout: 'main'},
    component: () => import('../views/CreateTown.vue'),
  },
  {
    path: '/create/product',
    name: 'create-product',
    meta: {layout: 'main'},
    component: () => import('../views/CreateProduct.vue'),
  },
  {
    path: '/create/firm',
    name: 'create-firm',
    meta: {layout: 'main'},
    component: () => import('../views/CreateFirm.vue'),
  },
  {
    path: '/create/opt',
    name: 'create-opt',
    meta: {layout: 'main'},
    component: () => import('../views/CreateOpt.vue'),
  },
  {
    path: '/create/mas',
    name: 'create-mas',
    meta: {layout: 'main'},
    component: () => import('../views/CreateMas.vue'),
  },
  {
    path: '/create/region',
    name: 'create-region',
    meta: {layout: 'main'},
    component: () => import('../views/CreateRegion.vue'),
  },
  {
    path: '/create/area',
    name: 'create-area',
    meta: {layout: 'main'},
    component: () => import('../views/CreateArea.vue'),
  },
  {
    path: '/myexpenses',
    name: 'my-expenses',
    meta: {layout: 'main'},
    component: () => import('../views/MyExpenses.vue'),
  },
  {
    path: '/allpersonalexpenses',
    name: 'all-personal-expenses',
    meta: {layout: 'main'},
    component: () => import('../views/AllPersonalExpenses.vue'),
  },
  {
    path: '/personalexpenses/:id',
    name: 'personal-expenses',
    meta: {layout: 'main'},
    component: () => import('../views/PersonalExpenses.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/create/pith',
    name: 'create-pith',
    meta: {layout: 'main'},
    component: () => import('../views/CreatePithName'),
  },
  {
    path: '/create/note',
    name: 'create-note',
    meta: {layout: 'main'},
    component: () => import('../views/CreateNoteName'),
  },
  {
    path: '/prepareorders',
    name: 'prepare-orders',
    meta: {layout: 'main'},
    component: () => import('../views/PrepareOrders'),
  },
  {
    path: '/404',
    name: '404',
    meta: {layout: 'empty'},
    component: () => import('../views/404.vue')
  },
  { path: '*',
   redirect: "/404" 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router