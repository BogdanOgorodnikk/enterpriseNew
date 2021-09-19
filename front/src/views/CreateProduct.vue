<template>
    <div class="create-product">
        <CreateProductList />
    </div>
</template>

<script>
import CreateProductList from '../components/createtype/CreateProductList'

export default {
    name: "CreateProduct",
    components: {
        CreateProductList
    }
}
</script>