<template>
    <div class="modal-order">
        <div class="opinion" @click.self="RemoveModal"></div>
        <div class="modal-order__box">
            <h2 class="modal-order__headline">Редагування замовлення</h2>
            <form class="modal-order__form" @submit.prevent="">
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Номер замовлення</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Номер замовлення">
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Номер машини</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Номер машини">
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Назва фірми</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Назва фірми">
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Дата</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Дата">
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Назва товару</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Назва товару">
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Кількість</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Кількість">
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Доставка</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Доставка">
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Доставка безготівка</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Доставка безготівка">
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Ціна</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Ціна">
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Оптова ціна</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Оптова ціна">
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Ціна продажу безготівкою</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Ціна продажу безготівкою">
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Видано готівки</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Видано готівки">
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Видано безготівки</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Видано безготівки">
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Змінити власника замовлення</label>
                    <select class="modal-order__form--select">
                        <option value="1">Вася</option>
                    </select>
                </div>
                <div class="modal-order__form--block">
                    <input type="submit" class="modal-order__form--button button" value="Змінити">
                    <button @click.prevent="RemoveModal" class="modal-order__form--button button">Відмінити</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalEditAllSeler",
    props: ['showEdit'],
    methods: {
        RemoveModal() {
            this.showEdit = !this.showEdit
            this.$emit('CancelEdit', this.showEdit)
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
    .modal-order__box {
        background: #fff;
        width: 500px;
        height: 610px;
        position: fixed;
        left: 34%;
        top: 6%;
        border-radius: 8px;
    }
    .modal-order__headline {
        text-align: center;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 700;
    }
    .modal-order__form {
        margin-left: 10px;
        margin-top: 10px;
    }
    .modal-order__form--text {
        font-size: 16px;
        font-weight: 400;
        margin-right: 5px;
    }
    .modal-order__form--block {
        display: flex;
        margin-top: 26px;
    }
    .modal-order__form--button {
        display: block;
        margin: 0 auto;
        width: 40%;
        background: #00a814;
        border: none;
        &:last-child {
            background: #e51f1f;
        }
    }
    .modal-order__form--input {
        width: 54%;
        margin-right: 10px;
    }
    .modal-order__form--info-block {
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
    }
    .modal-order__form--select {
        border: 1px solid #000;
        padding: 5px;
        border-radius: 4px;
        color: #000;
        font-size: 16px;
        font-weight: 400;
        width: 48%;
        margin-right: 10px;
    }
</style>