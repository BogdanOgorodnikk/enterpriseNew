<template>
    <div class="error">
        <div class="container">
            <h3 class="error__headline">Дана сторінка не знайдена, <router-link to="/">перейти на головну</router-link></h3>
        </div>
    </div>
</template>

<script>
export default {
    name: "404"
}
</script>

<style lang="scss" scoped>
    .error__headline {
        margin-top: 100px;
        margin-bottom: 30px;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
    }
</style>