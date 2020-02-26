import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import CustomerService from '../customer/customer.service';
import { ICustomer } from '@/shared/model/customer.model';

import AlertService from '@/shared/alert/alert.service';
import { IAddress, Address } from '@/shared/model/address.model';
import AddressService from './address.service';

const validations: any = {
  address: {
    address1: {},
    address2: {},
    city: {},
    postcode: {
      required,
      maxLength: maxLength(10)
    },
    country: {
      required,
      maxLength: maxLength(2)
    }
  }
};

@Component({
  validations
})
export default class AddressUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('addressService') private addressService: () => AddressService;
  public address: IAddress = new Address();

  @Inject('customerService') private customerService: () => CustomerService;

  public customers: ICustomer[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.addressId) {
        vm.retrieveAddress(to.params.addressId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.address.id) {
      this.addressService()
        .update(this.address)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('shopifyApp.address.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.addressService()
        .create(this.address)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('shopifyApp.address.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveAddress(addressId): void {
    this.addressService()
      .find(addressId)
      .then(res => {
        this.address = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.customerService()
      .retrieve()
      .then(res => {
        this.customers = res.data;
      });
  }
}
