<template>
  <div class="modal login" :class="open ? 'active' : ''">
    <div class="modal-block">
      <div class="_title">
        <p>Служба поддержки</p>
        <span @click="onClose">+</span>
      </div>
      <div class="input" :class="{ error: error.title }">
        <input
          type="text"
          placeholder="Заголовок"
          v-model="title"
          @input="
            () => {
              title === '' ? (error.title = true) : (error.title = false)
            }
          "
        />
        <template v-if="error.title">
          <span>Должен быть e-mail</span>
        </template>
      </div>
      <div class="textarea" :class="{ error: error.note }">
        <textarea
          placeholder="Описание"
          v-model="note"
          @input="
            () => {
              note === '' ? (error.note = true) : (error.note = false)
            }
          "
        />
        <template v-if="error.note">
          <span>Должен быть e-mail</span>
        </template>
      </div>

      <a-upload-dragger name="file" :multiple="true" @change="handleChange">
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">Добавить файл</p>
      </a-upload-dragger>

      <button class="btn-red" @click="onSubmit">Отправить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'supportModal',
  data() {
    return {
      title: '',
      note: '',
      error: {
        title: false,
        note: false,
      },
      file: [],
    }
  },
  methods: {
    onClose() {
      this.$emit('close-modal')
    },

    handleChange(value) {
      this.file = value.fileList
    },

    async onSubmit () {
      try {
        this.error.title = false
        this.error.note = false

        // eslint-disable-next-line no-undef
        const _new = new FormData()

        _new.append('title', this.title)
        _new.append('description', this.note)
        _new.append('file_upload', this.file)

        await this.$axios
          .post('support/store', _new)
          .then((response) => {
            this.$notification.success({
              message: 'Ваша заявка отправлена'
            })

            this.onClose()

            this.title = ''
            this.note = ''
          })
          .catch(() => {
            this.$notification.error({
              message: 'Заявка не отправлена'
            })
          })
      } catch (e) {}
    },
  },
  props: ['open']
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
