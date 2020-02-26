import { Component, Vue, Inject } from 'vue-property-decorator';

import { IWishList } from '@/shared/model/wish-list.model';
import WishListService from './wish-list.service';

@Component
export default class WishListDetails extends Vue {
  @Inject('wishListService') private wishListService: () => WishListService;
  public wishList: IWishList = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.wishListId) {
        vm.retrieveWishList(to.params.wishListId);
      }
    });
  }

  public retrieveWishList(wishListId) {
    this.wishListService()
      .find(wishListId)
      .then(res => {
        this.wishList = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
