<template>
  <div class="modal login" v-if='open' :class="open ? 'active' : ''" id='mount-point'>
    <div class="modal-block">
      <div class="_title">
        <p>Ответить</p>
        <span @click="onClose">+</span>
      </div>
      <div class="textarea" :class="{ error: error.comment }">
        <textarea
          v-model="comment"
          @input="
            () => {
              comment === '' ? (error.comment = true) : (error.comment = false)
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

      <button class="btn-red" @click="onSubmit" :disabled='isLoading'>Отправить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'supportModal',
  data() {
    return {
      comment: '',
      error: {
        comment: false,
      },
      file: [],
      isLoading: false
    }
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

    async onSubmit() {
      try {
        if (!this.comment) return

        this.error.comment = false
        this.isLoading = true

        // eslint-disable-next-line no-undef
        const formData = new FormData()

        formData.append('review', this.comment)
        for(let i = 0; i < this.file.length; i++ ){
          let file = this.file[i];
          formData.append('upload_file[' + i + ']', file.originFileObj);
        }

        await this.$axios
          .post(`reviews/${this.idSeries}/children`, formData, {
            headers: {
              'content-type':
                'multipart/form-data;boundary=' + localStorage.getItem('token'),
            }
          })
          .then(() => {
            this.$notification.success({
              message: 'Ваш комментарий успешно создан',
            })

            this.onClose()
            this._inSuccess()

            this.comment = ''
            this.isLoading = false
          })
          .catch(() => {
            this.$notification.error({
              message: 'Ваш комментарий не создан',
            })

            this.isLoading = false
          })
      } catch (e) {}
    },
  },
  props: ['open', 'idSeries'],
}
</script>

<style scoped lang="scss">
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
