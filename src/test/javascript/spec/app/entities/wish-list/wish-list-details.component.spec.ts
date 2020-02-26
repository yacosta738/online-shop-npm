/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import WishListDetailComponent from '@/entities/wish-list/wish-list-details.vue';
import WishListClass from '@/entities/wish-list/wish-list-details.component';
import WishListService from '@/entities/wish-list/wish-list.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('WishList Management Detail Component', () => {
    let wrapper: Wrapper<WishListClass>;
    let comp: WishListClass;
    let wishListServiceStub: SinonStubbedInstance<WishListService>;

    beforeEach(() => {
      wishListServiceStub = sinon.createStubInstance<WishListService>(WishListService);

      wrapper = shallowMount<WishListClass>(WishListDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { wishListService: () => wishListServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundWishList = { id: 123 };
        wishListServiceStub.find.resolves(foundWishList);

        // WHEN
        comp.retrieveWishList(123);
        await comp.$nextTick();

        // THEN
        expect(comp.wishList).toBe(foundWishList);
      });
    });
  });
});
