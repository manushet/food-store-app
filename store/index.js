export const state = () => ({
    fooddata: [],
})

// export const getters = {
//   getterValue: state => {
//     return state.value
//   }
// }

export const mutations = {
    updateFoodData: (state, data) => {
        state.fooddata = data;
    }
}

export const actions = {
    async getFoodData({state, commit}) {
        console.log('action getFoodData');
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
            console.log(fooddata);
            commit('updateFoodData', fooddata.fooddata);
        }
        catch(e) {
            console.log(e);
        }
    },
}
