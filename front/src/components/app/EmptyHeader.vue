<template>
    <header class="header">
        <div class="container">
            <div class="header__box">
                <img class="header__logo" src="../../assets/images/logo.png" alt="">
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "EmptyHeader"
}
</script>

<style lang="scss" scoped>
    .header {
        background: #2d67c5;
        overflow: hidden;
    }
    .header__box {
        display: flex;
        justify-content: center;
        margin: 10px 0px;
    }
    .header__logo {
        display: block;
        width: 116px;
    }
</style>