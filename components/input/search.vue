<template>
  <div class="input __search" :style="`height: ${height || 60}px`">
    <img src="@/assets/images/icons/search.png" alt="" />
    <input
      type="text"
      placeholder="Что бы вы хотели изучить?"
      @input="onChange"
      @change="onSearch"
    />
  </div>
</template>

<script>
export default {
  name: 'McvSearch',
  props: ['height'],
  data() {
    return {
      searchText: '',
    }
  },
  methods: {
    onSearch() {
      this.$router.push(`/course/search/${this.searchText}`)
    },
    onChange(event) {
      this.searchText = event.target.value
    },
  },
}
</script>

<style lang="scss" scoped>
.input {
  height: 60px;
  background: #ecf0f3;
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
  }

  input {
    width: 100%;
    padding: 0 20px;
    font-weight: normal;
    font-size: 18px;
    color: #0b132a;
    border: 0;
    background: transparent;
  }
}
</style>
