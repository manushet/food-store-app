<template>
    <div>
        <main class="container">
            <section
                class="image"
                :style="`background: url(/${currentItem.img}) no-repeat center center`"
            ></section>

            <section class="details">
                <h1>{{ currentItem.item }}</h1>

                <h3>Price: ${{ currentItem.price.toFixed(2) }}</h3>

                <div class="quantity">
                    <input 
                        type="number" 
                        min="1" 
                        v-model="count" />
                    <button class="primary" @click='onAddToCart'>Add to Cart - ${{ totalPrice }}</button>
                </div>

                <fieldset v-if="currentItem.options">
                    <legend>
                        <h3>Options</h3>
                    </legend>
                    <div v-for="option in currentItem.options" :key="option">
                        <input
                            type="radio"
                            name="option"
                            :id="option"
                            :value="option"
                            v-model="itemOptions"
                        />
                        <label :for="option">{{ option }}</label>
                    </div>
                </fieldset>

                <fieldset v-if="currentItem.addOns">
                    <legend>
                    <h3>Add Ons</h3>
                    </legend>
                    <div v-for="addon in currentItem.addOns" :key="addon">
                    <input
                        type="checkbox"
                        name="addon"
                        :id="addon.toLowerCase()"
                        :value="addon.toLowerCase()"
                        v-model="itemAddons"
                    />
                    <label :for="addon.toLowerCase()">{{ addon.toLowerCase() }}</label>
                    </div>
                </fieldset>               
            </section>           

            <section class="options">
                <h3>Description</h3>
                <p>{{ currentItem.description }}</p>
            </section>

            <app-toast v-if='showAlert' :class='alertType'>
                <template v-if='alertType === "success"'>
                    <p>Order submitted</p>
                    <p>Check out more 
                        <nuxt-link to="/restaurants">restaurants</nuxt-link>!
                    </p>  
                </template>
                <template v-else>
                    <p v-for='(err, i) in errors' :key='i'>{{ err }}</p>
                </template>         
            </app-toast>                 
        </main>
    </div>
</template>

<script>
import AppToast from "@/components/AppToast.vue";
import { mapState, mapActions } from 'vuex';

export default { 
    components: {
        AppToast,
    },
    data: () => ({
        id: null,
        count: 0,
        itemOptions: null,
        itemAddons: [],
        alertType: 'success',
        showAlert: false,
        errors: []
    }),
    created() {
        this.id = this.$route.params.id;
    },
    mounted() {
        const noneAddon = document.getElementById("none");
        const addons = document.querySelectorAll("input[name='addon']");
        addons.forEach(checkbox => {
            checkbox.addEventListener('click', (e) => {
                if (noneAddon.checked) {
                    addons.forEach(el => {
                        if (el.value !== 'none') {
                            el.checked = false;
                            this.itemAddons = ['none'];                        
                        }    
                    });
                }
            });  
        });
    },
    computed: {
        ...mapState(['fooddata']),
        currentItem() {
            let currentElement = null;
            this.fooddata.forEach(item => {
                for (let i = 0; i < item.menu.length; i++) {
                    if (item.menu[i].id === this.id) {
                        currentElement = item.menu[i];
                        break;
                    }
                }
            });
            return currentElement;        
        },
        totalPrice() {
            return parseFloat(this.count * parseFloat(this.currentItem.price)).toFixed(2);
        },      
    },
    methods: {
        ...mapActions(['addToCart']),
        onAddToCart() {
            this.errors = [];
            this.alertType = 'error';

            const formData = {
                name: this.currentItem.item,
                count: parseInt(this.count) * 1,
                price: parseFloat(this.currentItem.price).toFixed(2) * 1,
                options: this.itemOptions,
                addons: this.itemAddons,
            };

            if (!this.itemAddons.length) {
                this.errors.push('Please, select addons to continue');
            }
            if (this.currentItem.options && !this.itemOptions) {
                this.errors.push('Please, select option to continue');
            }
            if (!this.count) {
                this.errors.push('Please, choose an item count to continue');
            }

            if (!this.errors.length) {
                this.alertType = 'success';
                this.addToCart(formData);
            } 
            this.showAlert = true;        
        },
    }
}
</script>

<style scoped>
.container {
    width: 1000px;
    margin: 100px auto;
    display: grid;
    grid-template-columns: 400px 1fr;
    grid-template-rows: 400px 1fr;
    grid-column-gap: 60px;
    grid-row-gap: 60px;
    line-height: 2;
}

.image {
    grid-area: 1 / 1 / 2 / 2;
    background-size: cover;
}
.details {
    grid-area: 1 / 2 / 2 / 3;
    position: relative;
}
.options {
    grid-area: 2 / 1 / 3 / 2;
}
</style>