import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import ProductService from '../product/product.service';
import { IProduct } from '@/shared/model/product.model';

import CustomerService from '../customer/customer.service';
import { ICustomer } from '@/shared/model/customer.model';

import AlertService from '@/shared/alert/alert.service';
import { IWishList, WishList } from '@/shared/model/wish-list.model';
import WishListService from './wish-list.service';

const validations: any = {
  wishList: {
    title: {
      required
    },
    restricted: {}
  }
};

@Component({
  validations
})
export default class WishListUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('wishListService') private wishListService: () => WishListService;
  public wishList: IWishList = new WishList();

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];

  @Inject('customerService') private customerService: () => CustomerService;

  public customers: ICustomer[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.wishListId) {
        vm.retrieveWishList(to.params.wishListId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.wishList.id) {
      this.wishListService()
        .update(this.wishList)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('shopifyApp.wishList.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.wishListService()
        .create(this.wishList)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('shopifyApp.wishList.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveWishList(wishListId): void {
    this.wishListService()
      .find(wishListId)
      .then(res => {
        this.wishList = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.productService()
      .retrieve()
      .then(res => {
        this.products = res.data;
      });
    this.customerService()
      .retrieve()
      .then(res => {
        this.customers = res.data;
      });
  }
}
