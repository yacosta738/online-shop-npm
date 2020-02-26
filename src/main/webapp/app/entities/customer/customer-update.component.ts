import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import WishListService from '../wish-list/wish-list.service';
import { IWishList } from '@/shared/model/wish-list.model';

import AddressService from '../address/address.service';
import { IAddress } from '@/shared/model/address.model';

import AlertService from '@/shared/alert/alert.service';
import { ICustomer, Customer } from '@/shared/model/customer.model';
import CustomerService from './customer.service';

const validations: any = {
  customer: {
    firstName: {},
    lastName: {},
    email: {},
    telephone: {}
  }
};

@Component({
  validations
})
export default class CustomerUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('customerService') private customerService: () => CustomerService;
  public customer: ICustomer = new Customer();

  @Inject('wishListService') private wishListService: () => WishListService;

  public wishLists: IWishList[] = [];

  @Inject('addressService') private addressService: () => AddressService;

  public addresses: IAddress[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.customerId) {
        vm.retrieveCustomer(to.params.customerId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.customer.id) {
      this.customerService()
        .update(this.customer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('shopifyApp.customer.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.customerService()
        .create(this.customer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('shopifyApp.customer.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveCustomer(customerId): void {
    this.customerService()
      .find(customerId)
      .then(res => {
        this.customer = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.wishListService()
      .retrieve()
      .then(res => {
        this.wishLists = res.data;
      });
    this.addressService()
      .retrieve()
      .then(res => {
        this.addresses = res.data;
      });
  }
}
