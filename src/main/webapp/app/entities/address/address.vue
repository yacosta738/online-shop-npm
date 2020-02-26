<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('shopifyApp.address.home.title')" id="address-heading">Addresses</span>
            <router-link :to="{name: 'AddressCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-address">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('shopifyApp.address.home.createLabel')">
                    Create a new Address
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
        <div class="alert alert-warning" v-if="!isFetching && addresses && addresses.length === 0">
            <span v-text="$t('shopifyApp.address.home.notFound')">No addresses found</span>
        </div>
        <div class="table-responsive" v-if="addresses && addresses.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('address1')"><span v-text="$t('shopifyApp.address.address1')">Address 1</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'address1'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('address2')"><span v-text="$t('shopifyApp.address.address2')">Address 2</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'address2'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('city')"><span v-text="$t('shopifyApp.address.city')">City</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'city'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('postcode')"><span v-text="$t('shopifyApp.address.postcode')">Postcode</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'postcode'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('country')"><span v-text="$t('shopifyApp.address.country')">Country</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'country'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('customer.id')"><span v-text="$t('shopifyApp.address.customer')">Customer</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'customer.id'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="address in addresses"
                    :key="address.id">
                    <td>
                        <router-link :to="{name: 'AddressView', params: {addressId: address.id}}">{{address.id}}</router-link>
                    </td>
                    <td>{{address.address1}}</td>
                    <td>{{address.address2}}</td>
                    <td>{{address.city}}</td>
                    <td>{{address.postcode}}</td>
                    <td>{{address.country}}</td>
                    <td>
                        <div v-if="address.customer">
                            <router-link :to="{name: 'CustomerView', params: {customerId: address.customer.id}}">{{address.customer.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'AddressView', params: {addressId: address.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'AddressEdit', params: {addressId: address.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(address)"
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
            <span slot="modal-title"><span id="shopifyApp.address.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-address-heading" v-text="$t('shopifyApp.address.delete.question', {'id': removeId})">Are you sure you want to delete this Address?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-address" v-text="$t('entity.action.delete')" v-on:click="removeAddress()">Delete</button>
            </div>
        </b-modal>
        <div v-show="addresses && addresses.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./address.component.ts">
</script>
