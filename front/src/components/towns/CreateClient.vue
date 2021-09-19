<template>
    <div class="create-client">
        <div class="container">
            <h3 class="create-client__headline">Створити нового клієнта</h3>
            <form class="create-client__form">
                <input type="text" class="create-client__form--input input" placeholder="Ім'я клієнта">
                <input type="submit" class="create-client__form--button button" value="Створити">
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreateClient"
}
</script>

<style lang="scss" scoped>
    .create-client__headline {
        font-size: 18px;
        font-weight: 400;
    }
    .create-client__form {
        margin-top: 10px;
        margin-bottom: 30px;
    }
    .create-client__form--input {
        width: 40%;
    }
    .create-client__form--button {
        display: block;
        margin-top: 15px;
        background: #00a814;
        border: none;
    }
</style>