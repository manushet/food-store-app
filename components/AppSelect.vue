<template>
    <div>
        <label for='thing'>Which {{ select }} do you want?</label>
        <select 
            :id='select' 
            :name='select'
            @change='$emit("change", $event.target.value)'>
            <option value disabled>Please select a {{ select }}</option>
            <option v-for='option in selectOptions' :key='option' :value='option'>
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'AppSelect',
    props: {
        select: {
            type: String,
            default: "cuisine"
        },
        selectOptions: {
            type: Array,
            default: () => ['tacos', 'pizza', 'dim sum'],
        }
    }
}
</script>

<style scoped>

</style>