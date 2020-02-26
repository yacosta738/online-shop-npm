import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
]);
import Router from 'vue-router';
import { Authority } from '@/shared/security/authority';
const Home = () => import('../core/home/home.vue');
const Error = () => import('../core/error/error.vue');
const Register = () => import('../account/register/register.vue');
const Activate = () => import('../account/activate/activate.vue');
const ResetPasswordInit = () => import('../account/reset-password/init/reset-password-init.vue');
const ResetPasswordFinish = () => import('../account/reset-password/finish/reset-password-finish.vue');
const ChangePassword = () => import('../account/change-password/change-password.vue');
const Settings = () => import('../account/settings/settings.vue');
const JhiUserManagementComponent = () => import('../admin/user-management/user-management.vue');
const JhiUserManagementViewComponent = () => import('../admin/user-management/user-management-view.vue');
const JhiUserManagementEditComponent = () => import('../admin/user-management/user-management-edit.vue');
const JhiConfigurationComponent = () => import('../admin/configuration/configuration.vue');
const JhiDocsComponent = () => import('../admin/docs/docs.vue');
const JhiHealthComponent = () => import('../admin/health/health.vue');
const JhiLogsComponent = () => import('../admin/logs/logs.vue');
const JhiAuditsComponent = () => import('../admin/audits/audits.vue');
const JhiMetricsComponent = () => import('../admin/metrics/metrics.vue');
/* tslint:disable */
// prettier-ignore
const Category = () => import('../entities/category/category.vue');
// prettier-ignore
const CategoryUpdate = () => import('../entities/category/category-update.vue');
// prettier-ignore
const CategoryDetails = () => import('../entities/category/category-details.vue');
// prettier-ignore
const Product = () => import('../entities/product/product.vue');
// prettier-ignore
const ProductUpdate = () => import('../entities/product/product-update.vue');
// prettier-ignore
const ProductDetails = () => import('../entities/product/product-details.vue');
// prettier-ignore
const Customer = () => import('../entities/customer/customer.vue');
// prettier-ignore
const CustomerUpdate = () => import('../entities/customer/customer-update.vue');
// prettier-ignore
const CustomerDetails = () => import('../entities/customer/customer-details.vue');
// prettier-ignore
const Address = () => import('../entities/address/address.vue');
// prettier-ignore
const AddressUpdate = () => import('../entities/address/address-update.vue');
// prettier-ignore
const AddressDetails = () => import('../entities/address/address-details.vue');
// prettier-ignore
const WishList = () => import('../entities/wish-list/wish-list.vue');
// prettier-ignore
const WishListUpdate = () => import('../entities/wish-list/wish-list-update.vue');
// prettier-ignore
const WishListDetails = () => import('../entities/wish-list/wish-list-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

Vue.use(Router);

// prettier-ignore
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/account/activate',
      name: 'Activate',
      component: Activate
    },
    {
      path: '/account/reset/request',
      name: 'ResetPasswordInit',
      component: ResetPasswordInit
    },
    {
      path: '/account/reset/finish',
      name: 'ResetPasswordFinish',
      component: ResetPasswordFinish
    },
    {
      path: '/account/password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/account/settings',
      name: 'Settings',
      component: Settings,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/admin/user-management',
      name: 'JhiUser',
      component: JhiUserManagementComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/new',
      name: 'JhiUserCreate',
      component: JhiUserManagementEditComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/:userId/edit',
      name: 'JhiUserEdit',
      component: JhiUserManagementEditComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/:userId/view',
      name: 'JhiUserView',
      component: JhiUserManagementViewComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/docs',
      name: 'JhiDocsComponent',
      component: JhiDocsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/audits',
      name: 'JhiAuditsComponent',
      component: JhiAuditsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-health',
      name: 'JhiHealthComponent',
      component: JhiHealthComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/logs',
      name: 'JhiLogsComponent',
      component: JhiLogsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-metrics',
      name: 'JhiMetricsComponent',
      component: JhiMetricsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-configuration',
      name: 'JhiConfigurationComponent',
      component: JhiConfigurationComponent,
      meta: { authorities: [Authority.ADMIN] }
    }
    ,
    {
      path: '/category',
      name: 'Category',
      component: Category,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/category/new',
      name: 'CategoryCreate',
      component: CategoryUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/category/:categoryId/edit',
      name: 'CategoryEdit',
      component: CategoryUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/category/:categoryId/view',
      name: 'CategoryView',
      component: CategoryDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/product',
      name: 'Product',
      component: Product,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/product/new',
      name: 'ProductCreate',
      component: ProductUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/product/:productId/edit',
      name: 'ProductEdit',
      component: ProductUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/product/:productId/view',
      name: 'ProductView',
      component: ProductDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/customer',
      name: 'Customer',
      component: Customer,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/customer/new',
      name: 'CustomerCreate',
      component: CustomerUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/customer/:customerId/edit',
      name: 'CustomerEdit',
      component: CustomerUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/customer/:customerId/view',
      name: 'CustomerView',
      component: CustomerDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/address',
      name: 'Address',
      component: Address,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/address/new',
      name: 'AddressCreate',
      component: AddressUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/address/:addressId/edit',
      name: 'AddressEdit',
      component: AddressUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/address/:addressId/view',
      name: 'AddressView',
      component: AddressDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/wish-list',
      name: 'WishList',
      component: WishList,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/wish-list/new',
      name: 'WishListCreate',
      component: WishListUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/wish-list/:wishListId/edit',
      name: 'WishListEdit',
      component: WishListUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/wish-list/:wishListId/view',
      name: 'WishListView',
      component: WishListDetails,
      meta: { authorities: [Authority.USER] }
    }
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ]
});
