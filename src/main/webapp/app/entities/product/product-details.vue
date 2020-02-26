<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="product">
                <h2 class="jh-entity-heading"><span v-text="$t('shopifyApp.product.detail.title')">Product</span> {{product.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('shopifyApp.product.title')">Title</span>
                    </dt>
                    <dd>
                        <span>{{product.title}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('shopifyApp.product.keywords')">Keywords</span>
                    </dt>
                    <dd>
                        <span>{{product.keywords}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('shopifyApp.product.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{product.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('shopifyApp.product.rating')">Rating</span>
                    </dt>
                    <dd>
                        <span>{{product.rating}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('shopifyApp.product.dateAdded')">Date Added</span>
                    </dt>
                    <dd>
                        <span>{{product.dateAdded}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('shopifyApp.product.dateModified')">Date Modified</span>
                    </dt>
                    <dd>
                        <span>{{product.dateModified}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('shopifyApp.product.wishList')">Wish List</span>
                    </dt>
                    <dd>
                        <div v-if="product.wishList">
                            <router-link :to="{name: 'WishListView', params: {wishListId: product.wishList.id}}">{{product.wishList.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="product.id" :to="{name: 'ProductEdit', params: {productId: product.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./product-details.component.ts">
</script>
