<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="category">
                <h2 class="jh-entity-heading"><span v-text="$t('shopifyApp.category.detail.title')">Category</span> {{category.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('shopifyApp.category.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{category.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('shopifyApp.category.sortOrder')">Sort Order</span>
                    </dt>
                    <dd>
                        <span>{{category.sortOrder}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('shopifyApp.category.dateAdded')">Date Added</span>
                    </dt>
                    <dd>
                        <span>{{category.dateAdded}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('shopifyApp.category.dateModified')">Date Modified</span>
                    </dt>
                    <dd>
                        <span>{{category.dateModified}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('shopifyApp.category.status')">Status</span>
                    </dt>
                    <dd>
                        <span v-text="$t('shopifyApp.CategoryStatus.' + category.status)">{{category.status}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('shopifyApp.category.parent')">Parent</span>
                    </dt>
                    <dd>
                        <div v-if="category.parent">
                            <router-link :to="{name: 'CategoryView', params: {categoryId: category.parent.id}}">{{category.parent.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('shopifyApp.category.product')">Product</span>
                    </dt>
                    <dd>
                        <span v-for="(product, i) in category.products" :key="product.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'ProductView', params: {productId: product.id}}">{{product.title}}</router-link>
                        </span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="category.id" :to="{name: 'CategoryEdit', params: {categoryId: category.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./category-details.component.ts">
</script>
