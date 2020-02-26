<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('shopifyApp.category.home.title')" id="category-heading">Categories</span>
            <router-link :to="{name: 'CategoryCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-category">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('shopifyApp.category.home.createLabel')">
                    Create a new Category
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
        <div class="alert alert-warning" v-if="!isFetching && categories && categories.length === 0">
            <span v-text="$t('shopifyApp.category.home.notFound')">No categories found</span>
        </div>
        <div class="table-responsive" v-if="categories && categories.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('description')"><span v-text="$t('shopifyApp.category.description')">Description</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('sortOrder')"><span v-text="$t('shopifyApp.category.sortOrder')">Sort Order</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'sortOrder'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('dateAdded')"><span v-text="$t('shopifyApp.category.dateAdded')">Date Added</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'dateAdded'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('dateModified')"><span v-text="$t('shopifyApp.category.dateModified')">Date Modified</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'dateModified'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('status')"><span v-text="$t('shopifyApp.category.status')">Status</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'status'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('parent.id')"><span v-text="$t('shopifyApp.category.parent')">Parent</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'parent.id'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="category in categories"
                    :key="category.id">
                    <td>
                        <router-link :to="{name: 'CategoryView', params: {categoryId: category.id}}">{{category.id}}</router-link>
                    </td>
                    <td>{{category.description}}</td>
                    <td>{{category.sortOrder}}</td>
                    <td>{{category.dateAdded}}</td>
                    <td>{{category.dateModified}}</td>
                    <td v-text="$t('shopifyApp.CategoryStatus.' + category.status)">{{category.status}}</td>
                    <td>
                        <div v-if="category.parent">
                            <router-link :to="{name: 'CategoryView', params: {categoryId: category.parent.id}}">{{category.parent.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'CategoryView', params: {categoryId: category.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'CategoryEdit', params: {categoryId: category.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(category)"
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
            <span slot="modal-title"><span id="shopifyApp.category.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-category-heading" v-text="$t('shopifyApp.category.delete.question', {'id': removeId})">Are you sure you want to delete this Category?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-category" v-text="$t('entity.action.delete')" v-on:click="removeCategory()">Delete</button>
            </div>
        </b-modal>
        <div v-show="categories && categories.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./category.component.ts">
</script>
