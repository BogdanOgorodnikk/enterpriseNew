<template>
    <div class="modal-client">
        <div class="opinion" @click.self="RemoveModal"></div>
        <div class="modal-client__box">
            <h2 class="modal-client__headline">Карточка клієнта</h2>
            <h2 class="modal-client__headline">{{name}}</h2>
            <form class="modal-client__form" @submit.prevent="">
                <p class="modal-client__form--text">Ім'я клієнта: <span class="modal-client__form--span">{{name}}</span></p>
                <p class="modal-client__form--text">Номер телефона: <span class="modal-client__form--span">{{phone}}</span></p>
                <p class="modal-client__form--text">Адреса магазина: <span class="modal-client__form--span">{{shopStreet}}</span></p>
                <p class="modal-client__form--text">Назва магазина: <span class="modal-client__form--span">{{shopName}}</span></p>
                <p class="modal-client__form--text">Ім'я власника резервного телефона: <span class="modal-client__form--span">{{reserveName}}</span></p>
                <p class="modal-client__form--text">Резервний номер телефона: <span class="modal-client__form--span">{{reservePhone}}</span></p>
                <button @click.prevent="RemoveModal" class="modal-client__form--button button">Закрити</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalCardClient",
    props: ['showModalCard', 'name', 'phone', 'reserveName', 'reservePhone', 'shopName', 'shopStreet'],
    methods: {
        RemoveModal() {
            this.showModalCard = !this.showModalCard
            this.$emit('CancelCard', this.showModalCard)
        }
    }
}
</script>

<style lang="scss" scoped>
    .opinion {
        background: rgba(0,0,0, 0.5);
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
    }
    .modal-client__box {
        background: #fff;
        max-width: 500px;
        width: 100%;
        position: fixed;
        left: 34%;
        top: 16%;
        border-radius: 8px;
    }
    .modal-client__headline {
        text-align: center;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 700;
    }
    .modal-client__form {
        margin-left: 10px;
        margin-top: 10px;
    }
    .modal-client__form--text {
        font-size: 16px;
        font-weight: 400;
        margin-top: 5px;
    }
    .modal-client__form--button {
        display: block;
        margin: 30px auto;
        width: 40%;
        background: #e51f1f;
        border: none;
    }
    .modal-client__form--input {
        width: 98%;
        margin-top: 10px;
    }
    .modal-client__form--span {
        font-weight: 700;
    }
@media screen and (max-width: 1000px) {
    .modal-client__box {
        left: 20%;
    }
}
@media screen and (max-width: 638px) {
    .modal-client__box {
        left: 0%;
    }
}
@media screen and (max-width: 324px) {
    .modal-client__box {
        height: 360px;
    }
}
@media screen and (max-width: 244px) {
    .modal-client__box {
        height: 380px;
    }
}
@media screen and (max-width: 229px) {
    .modal-client__box {
        height: 440px;
    }
}
</style>