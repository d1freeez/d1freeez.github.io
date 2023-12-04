<template>
  <div class="modal login" :class="open ? 'active' : ''" v-if='!!comment || open'>
    <div class="modal-block">
      <div class="_title">
        <p>Редактировать</p>
        <span @click="onClose">+</span>
      </div>
      <div v-if='!!comment' class="textarea" :class="{ error: error.comment }">
        <textarea
          v-model="comment_text"
          @input="
            () => {
              comment_text === '' ? (error.comment = true) : (error.comment = false)
            }
          "
        />
        <template v-if="error.comment">
          <span>Это поле обязательно для заполнения</span>
        </template>
      </div>

      <a-upload-dragger name="file" :multiple="true" @change="handleChange">
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-comment">Добавить файл</p>
      </a-upload-dragger>

      <div class='_file' v-if='!!comment_file.length' >
        <ul>
          <li v-for='file in comment_file'>
            <a-icon type='paper-clip' /> {{file.name}} <a-icon type='delete' @click='deleteFile(file.id)'/>
          </li>
        </ul>
      </div>

      <button class="btn-red" @click="onSubmit" :disabled='isLoading'>Отправить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'updateCommentModal',
  data() {
    return {
      comment_text: '',
      error: {
        comment: false,
      },
      file: [],
      comment_file: [],
      isLoading: false
    }
  },
  mounted () {
    this.comment_text = this.comment.review
    this.comment_file = this.comment.attachment
  },
  methods: {
    onClose() {
      this.$emit('close-modal')
    },

    handleChange(value) {
      this.file = value.fileList
    },

    async _inSuccess() {
      await this.$store.dispatch(
        'course_series_reviews/set',
        this.$route.params.id
      )
    },

    deleteFile(id){
      this.$axios.delete(`reviews/${this.comment.id}/file/${id}`).then(response => {
        this.comment_file = this.comment_file.filter(e => e.id !== id)
      })
    },

    async onSubmit() {
      try {
        if (!this.comment_text) return

        this.error.comment = false
        this.isLoading = true

        // eslint-disable-next-line no-undef
        const formData = new FormData()

        formData.append('review', this.comment_text)
        for(let i = 0; i < this.file.length; i++ ){
          let file = this.file[i];
          formData.append('upload_file[' + i + ']', file.originFileObj);
        }

        await this.$axios
          .post(`reviews/${this.comment.id}/update`, formData, {
            headers: {
              'content-type':
                'multipart/form-data;boundary=' + localStorage.getItem('token'),
            }
          })
          .then(() => {
            this.$notification.success({
              message: 'Ваш комментарий успешно обновлен',
            })

            this.onClose()
            this._inSuccess()

            this.comment = ''
            this.isLoading = false
          })
          .catch(() => {
            this.$notification.error({
              message: 'Ваш комментарий не обновлен',
            })

            this.isLoading = false
          })
      } catch (e) {}
    },
  },
  props: ['open', 'idSeries', 'comment'],
}
</script>

<style scoped lang="scss">
._file{
  margin-top: 10px;
  border-top: 1px solid #C8C8C8;
  padding: 10px 0;

  li{
    display: grid;
    grid-template-columns: 15px 1fr 15px;
    grid-gap: 10px;
    margin-bottom: 5px;
  }
}

input,
teaxtare {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  color: #0b132a;

  &::placeholder {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 400;
    color: #0b132a;
  }
}

.textarea {
  margin-bottom: 30px;
}

button {
  width: 100%;
  margin-top: 30px;

  &.btn-white {
    font-family: Montserrat;
    font-weight: 400;
    margin-bottom: 15px;
  }
}

._upload {
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
