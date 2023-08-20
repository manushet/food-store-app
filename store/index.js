import {v4 as uuidv4} from "uuid";

export const state = () => ({
    fooddata: [],
    cart: [],
})

export const getters = {
    totalCartAmount: state => {
        const total = state.cart.reduce((acc, val) => {
            return acc + val.count * val.price;
        }, 0);
        return parseFloat(total*1).toFixed(2) || 0;
    },
    cartCount: state => {
        return state.cart.reduce((acc, val) => {
            return acc + val.count;
        }, 0) || 0;
    }
}

export const mutations = {
    updateFoodData: (state, data) => {
        state.fooddata = data;
    },
    addToCart(state, cartItem) {
        console.log(cartItem);
        state.cart.push(cartItem);
    }
}

export const actions = {
    async getFoodData({state, commit}) {
        if (state.fooddata.length) {
            return;
        }
        try {
            const res = await fetch('https://hrthrrthrthrthrhr.000webhostapp.com/restaurantsApi.php', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const fooddata = await res.json();
            commit('updateFoodData', fooddata.fooddata);
        }
        catch(e) {
            console.log(e);
        }
    },
    addToCart({commit}, data) {  
        const id = uuidv4();
        commit('addToCart', {...data, id});
    }
                
}
