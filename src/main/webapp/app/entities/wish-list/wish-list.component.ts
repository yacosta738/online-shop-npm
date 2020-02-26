import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IWishList } from '@/shared/model/wish-list.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import WishListService from './wish-list.service';

@Component
export default class WishList extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('wishListService') private wishListService: () => WishListService;
  private removeId: number = null;

  public wishLists: IWishList[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllWishLists();
  }

  public clear(): void {
    this.retrieveAllWishLists();
  }

  public retrieveAllWishLists(): void {
    this.isFetching = true;

    this.wishListService()
      .retrieve()
      .then(
        res => {
          this.wishLists = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IWishList): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeWishList(): void {
    this.wishListService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('shopifyApp.wishList.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllWishLists();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
