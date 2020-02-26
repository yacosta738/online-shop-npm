<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="shopifyApp.product.home.createOrEditLabel" v-text="$t('shopifyApp.product.home.createOrEditLabel')">Create or edit a Product</h2>
                <div>
                    <div class="form-group" v-if="product.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="product.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('shopifyApp.product.title')" for="product-title">Title</label>
                        <input type="text" class="form-control" name="title" id="product-title"
                            :class="{'valid': !$v.product.title.$invalid, 'invalid': $v.product.title.$invalid }" v-model="$v.product.title.$model"  required/>
                        <div v-if="$v.product.title.$anyDirty && $v.product.title.$invalid">
                            <small class="form-text text-danger" v-if="!$v.product.title.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('shopifyApp.product.keywords')" for="product-keywords">Keywords</label>
                        <input type="text" class="form-control" name="keywords" id="product-keywords"
                            :class="{'valid': !$v.product.keywords.$invalid, 'invalid': $v.product.keywords.$invalid }" v-model="$v.product.keywords.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('shopifyApp.product.description')" for="product-description">Description</label>
                        <input type="text" class="form-control" name="description" id="product-description"
                            :class="{'valid': !$v.product.description.$invalid, 'invalid': $v.product.description.$invalid }" v-model="$v.product.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('shopifyApp.product.rating')" for="product-rating">Rating</label>
                        <input type="number" class="form-control" name="rating" id="product-rating"
                            :class="{'valid': !$v.product.rating.$invalid, 'invalid': $v.product.rating.$invalid }" v-model.number="$v.product.rating.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('shopifyApp.product.dateAdded')" for="product-dateAdded">Date Added</label>
                        <div class="input-group">
                            <input id="product-dateAdded" type="date" class="form-control" name="dateAdded"  :class="{'valid': !$v.product.dateAdded.$invalid, 'invalid': $v.product.dateAdded.$invalid }"
                            v-model="$v.product.dateAdded.$model"  />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('shopifyApp.product.dateModified')" for="product-dateModified">Date Modified</label>
                        <div class="input-group">
                            <input id="product-dateModified" type="date" class="form-control" name="dateModified"  :class="{'valid': !$v.product.dateModified.$invalid, 'invalid': $v.product.dateModified.$invalid }"
                            v-model="$v.product.dateModified.$model"  />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('shopifyApp.product.wishList')" for="product-wishList">Wish List</label>
                        <select class="form-control" id="product-wishList" name="wishList" v-model="product.wishList">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="product.wishList && wishListOption.id === product.wishList.id ? product.wishList : wishListOption" v-for="wishListOption in wishLists" :key="wishListOption.id">{{wishListOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.product.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./product-update.component.ts">
</script>
