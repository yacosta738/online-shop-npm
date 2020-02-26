import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import ProductService from '../product/product.service';
import { IProduct } from '@/shared/model/product.model';

import AlertService from '@/shared/alert/alert.service';
import { ICategory, Category } from '@/shared/model/category.model';
import CategoryService from './category.service';

const validations: any = {
  category: {
    description: {
      required
    },
    sortOrder: {},
    dateAdded: {},
    dateModified: {},
    status: {}
  }
};

@Component({
  validations
})
export default class CategoryUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('categoryService') private categoryService: () => CategoryService;
  public category: ICategory = new Category();

  public categories: ICategory[] = [];

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.categoryId) {
        vm.retrieveCategory(to.params.categoryId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.category.products = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.category.id) {
      this.categoryService()
        .update(this.category)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('shopifyApp.category.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.categoryService()
        .create(this.category)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('shopifyApp.category.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveCategory(categoryId): void {
    this.categoryService()
      .find(categoryId)
      .then(res => {
        this.category = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.categoryService()
      .retrieve()
      .then(res => {
        this.categories = res.data;
      });
    this.productService()
      .retrieve()
      .then(res => {
        this.products = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
