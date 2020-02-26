<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="customer">
                <h2 class="jh-entity-heading"><span v-text="$t('shopifyApp.customer.detail.title')">Customer</span> {{customer.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('shopifyApp.customer.firstName')">First Name</span>
                    </dt>
                    <dd>
                        <span>{{customer.firstName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('shopifyApp.customer.lastName')">Last Name</span>
                    </dt>
                    <dd>
                        <span>{{customer.lastName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('shopifyApp.customer.email')">Email</span>
                    </dt>
                    <dd>
                        <span>{{customer.email}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('shopifyApp.customer.telephone')">Telephone</span>
                    </dt>
                    <dd>
                        <span>{{customer.telephone}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="customer.id" :to="{name: 'CustomerEdit', params: {customerId: customer.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./customer-details.component.ts">
</script>
