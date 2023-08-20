<template>
    <main class="container restaurant">
        <div class="restaurantheading">
            <h1>Restaurants</h1>
            <app-select @change='onSelectChange'/>
        </div>
        <AppRestaurantInfo :fooddata='filteredRestaurants'/>
    </main>
</template>

<script>
import AppRestaurantInfo from "@/components/AppRestaurantInfo.vue";
import AppSelect from '../components/AppSelect.vue';
import { mapState } from 'vuex';

export default {
    components: {
        AppRestaurantInfo,
        AppSelect,
    },
    data: () => ({
        selectedRestaurant: null,
    }),
    computed: {
        ...mapState(['fooddata']),
        filteredRestaurants() {
            return this.selectedRestaurant ? 
                this.fooddata.filter(el => el.name.toLowerCase().includes(this.selectedRestaurant)) : 
                this.fooddata;  
        }
    },
    methods: {
        onSelectChange(val) {
            this.selectedRestaurant = val;
        }
    }
};
</script>

<style lang="scss" scoped></style>
