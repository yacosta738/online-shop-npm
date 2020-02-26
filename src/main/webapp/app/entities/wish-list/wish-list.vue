<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('shopifyApp.wishList.home.title')" id="wish-list-heading">Wish Lists</span>
            <router-link :to="{name: 'WishListCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-wish-list">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('shopifyApp.wishList.home.createLabel')">
                    Create a new Wish List
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && wishLists && wishLists.length === 0">
            <span v-text="$t('shopifyApp.wishList.home.notFound')">No wishLists found</span>
        </div>
        <div class="table-responsive" v-if="wishLists && wishLists.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('shopifyApp.wishList.title')">Title</span></th>
                    <th><span v-text="$t('shopifyApp.wishList.restricted')">Restricted</span></th>
                    <th><span v-text="$t('shopifyApp.wishList.customer')">Customer</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="wishList in wishLists"
                    :key="wishList.id">
                    <td>
                        <router-link :to="{name: 'WishListView', params: {wishListId: wishList.id}}">{{wishList.id}}</router-link>
                    </td>
                    <td>{{wishList.title}}</td>
                    <td>{{wishList.restricted}}</td>
                    <td>
                        <div v-if="wishList.customer">
                            <router-link :to="{name: 'CustomerView', params: {customerId: wishList.customer.id}}">{{wishList.customer.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'WishListView', params: {wishListId: wishList.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'WishListEdit', params: {wishListId: wishList.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(wishList)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="shopifyApp.wishList.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-wishList-heading" v-text="$t('shopifyApp.wishList.delete.question', {'id': removeId})">Are you sure you want to delete this Wish List?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-wishList" v-text="$t('entity.action.delete')" v-on:click="removeWishList()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./wish-list.component.ts">
</script>
