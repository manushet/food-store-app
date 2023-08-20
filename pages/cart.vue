<template>
    <div class='container cart'>
        <h2>Cart</h2>
        <section v-if="cart.length">
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Add Ons</th>
                        <th>Amount</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cart" :key="item.id">
                        <td>
                        {{ item.name }}
                        <span v-if="item.options">- {{ item.options }}</span>
                        </td>
                        <td>
                        <span v-for="addon in item.addons" :key="addon" class="comma">{{
                            addon
                        }}</span>
                        </td>
                        <td>{{ item.count }}</td>
                        <td>{{ (parseInt(item.count) * parseFloat(item.price)).toFixed(2) }}</td>
                    </tr>
                    <tr>
                        <td colspan="3"></td>
                        <td class="total">Total: ${{ totalCartAmount }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
        <AppEmptyCart v-else />        
    </div>
</template>

<script>
import AppEmptyCart from '../components/AppEmptyCart.vue';
import { mapState, mapGetters } from 'vuex';

export default {
    components: {
        AppEmptyCart
    },
    data: () => ({
        tets: null
    }),
    computed: {
        ...mapGetters(['totalCartAmount']),
        ...mapState(['cart']),
    }
}
</script>

<style scoped>

</style>