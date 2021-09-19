<template>
  <div class="modal-create">
    <div class="opinion" @click.self="RemoveModal"></div>
    <div class="modal-create__box">
      <h2 class="modal-create__headline">Коментарі до замовлення №{{orderNumber}} </h2>

      <div class="comments-block">
        <div class="comments" v-for="comment in comments" :key="comment.id">
          <div class="comments-description">
            <span class="comments-create">Надіслано від {{comment.createrName}}</span>:
            {{comment.description}}
          </div>
          <div class="comments-wrapper" v-if="user.role_id === 1">
            <button class="comments-button button" @click="onClickStartEditComment(comment.description, comment.id)">Редагувати</button>
            <button class="comments-button button" @click="onClickDeleteComment(comment.id)">Видалити</button>
          </div>
        </div>
      </div>

      <form class="create-comment">
        <p class="create-comment-text">Введіть коментар в полі нижче</p>
        <input type="text" class="create-comment-input input" placeholder="Коментар" v-model="description"
               :class="{invalid: ($v.description.$dirty && !$v.description.required)}"
        >
        <small
            class="helper-text__invalid"
            v-if="$v.description.$dirty && !$v.description.required"
        >Поле коментар не повинно бути пустим!</small>

        <button @click.prevent="createComment" v-if="!isUpdatedComment" class="create-comment-button button">Створити коментар</button>
        <button @click.prevent="onClickUpdateComment" v-if="isUpdatedComment" class="update-comment-button button">Обновити коментар</button>
      </form>
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import axios from "axios";

export default {
  name: "ModalComments",
  props: ['showComments', 'id', "orderNumber"],
  data: () => ({
    description: '',
    commentId: '',
    comments: [],
    isUpdatedComment: false,
  }),
  validations: {
    description: {required}
  },

  mounted() {
    this.getComments()
  },

  computed: {
    user() {
      return this.$store.state.auth.newuser.user
    },
  },

  methods: {
    async getComments() {
      try {
        const result = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/comment/${this.id}`, {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        this.comments = result.data
      } catch(e) {
        alert("Відбулася помилка")
      }
    },

    async createComment() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        order_id: this.id,
        description: this.description,
      }
      try  {
        await this.$store.dispatch('createComment', formData)
        this.description = ''
      } catch (e) {
        alert('Відбулася помилка')
      }

      this.getComments()
    },

    async onClickUpdateComment() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        description: this.description,
        id: this.commentId,
      }
      try  {
        await this.$store.dispatch('updateComment', formData)
        this.description = ''
        this.isUpdatedComment = false
      } catch (e) {
        alert('Відбулася помилка')
      }

      this.getComments()
    },

    async onClickDeleteComment(id) {
      try  {
        const agree = prompt("Введіть пароль для видалення?")
        if(agree === "1111") {
          await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/comment/${id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
          })
          this.getComments()
        }
      } catch (e) {
        alert('Відбулася помилка')
      }
    },

    onClickStartEditComment(description, commentId) {
        this.isUpdatedComment = true;
        this.description = description
        this.commentId = commentId
    },

    RemoveModal() {
      this.showComments = !this.showComments
      this.$emit('CloseCommentsModal', this.showComments)
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
.modal-create__box {
  background: #fff;
  max-width: 500px;
  width: 100%;
  position: fixed;
  left: 34%;
  top: 8%;
  border-radius: 8px;
  overflow-y: scroll;
}
.modal-create__headline {
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
}

.comments-block {
  padding: 15px;
  height: 424px;
  overflow-y: scroll;
}

.comments {
  margin-bottom: 10px;
}

.comments-description {
  font-size: 16px;
  font-weight: 400;
  color: #000000;
}

.comments-create {
  font-weight: 700;
}

.comments-button {
  border: none;
  background: inherit;
  color: #000094;
  font-size: 14px;
  font-weight: 700;

  &:hover {
    color: black;
  }
}

.create-comment-text {
  font-size: 16px;
  color: #000000;
  font-weight: 500;
  padding-left: 15px;
}

.create-comment {
  margin-bottom: 20px;
}

.create-comment-input {
  margin-left: 15px;
  width: 94%;
  margin-top: 10px;
}

.create-comment-button {
  margin-left: 15px;
  margin-top: 10px;
  background: #00a814;
  border: 0;
}

.update-comment-button {
  margin-left: 15px;
  margin-top: 10px;
  background: #f59b00;
  border: 0;
}

.helper-text__invalid {
  margin-left: 15px;
}
@media screen and (max-width: 1000px) {
  .modal-create__box {
    left: 20%;
  }
}
@media screen and (max-width: 638px) {
  .modal-create__box {
    left: 0%;
  }

  .modal-create__box {
    height: 90%;
  }
}
@media screen and (max-width: 229px) {
  .modal-create__box {
    height: 220px;
  }
}
</style>