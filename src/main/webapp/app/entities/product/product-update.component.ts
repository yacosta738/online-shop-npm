import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import WishListService from '../wish-list/wish-list.service';
import { IWishList } from '@/shared/model/wish-list.model';

import CategoryService from '../category/category.service';
import { ICategory } from '@/shared/model/category.model';

import AlertService from '@/shared/alert/alert.service';
import { IProduct, Product } from '@/shared/model/product.model';
import ProductService from './product.service';

const validations: any = {
  product: {
    title: {
      required
    },
    keywords: {},
    description: {},
    rating: {},
    dateAdded: {},
    dateModified: {}
  }
};

@Component({
  validations
})
export default class ProductUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('productService') private productService: () => ProductService;
  public product: IProduct = new Product();

  @Inject('wishListService') private wishListService: () => WishListService;

  public wishLists: IWishList[] = [];

  @Inject('categoryService') private categoryService: () => CategoryService;

  public categories: ICategory[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productId) {
        vm.retrieveProduct(to.params.productId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.product.id) {
      this.productService()
        .update(this.product)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('shopifyApp.product.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.productService()
        .create(this.product)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('shopifyApp.product.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveProduct(productId): void {
    this.productService()
      .find(productId)
      .then(res => {
        this.product = res;
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
    this.categoryService()
      .retrieve()
      .then(res => {
        this.categories = res.data;
      });
  }
}
