<template>
  <transition name="fade">
    <div class="modaldiolog" v-if="show">
      <div class="modaldiolog__backdrop" @click="closeModal()"/>

      <div class="modaldiolog__dialog">
        <div class="modaldiolog__header">
          <slot name="header"/>
          <button type="button" class="modaldiolog__close" @click="closeModal()">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 x="0px" y="0px"
                 viewBox="0 0 455.111 455.111" style="enable-background:new 0 0 455.111 455.111;" xml:space="preserve"
            >
<circle style="fill:#E24C4B;" cx="227.556" cy="227.556" r="227.556"/>
              <path style="fill:#D1403F;" d="M455.111,227.556c0,125.156-102.4,227.556-227.556,227.556c-72.533,0-136.533-32.711-177.778-85.333
	c38.4,31.289,88.178,49.778,142.222,49.778c125.156,0,227.556-102.4,227.556-227.556c0-54.044-18.489-103.822-49.778-142.222
	C422.4,91.022,455.111,155.022,455.111,227.556z"
              />
              <path style="fill:#FFFFFF;" d="M331.378,331.378c-8.533,8.533-22.756,8.533-31.289,0l-72.533-72.533l-72.533,72.533
	c-8.533,8.533-22.756,8.533-31.289,0c-8.533-8.533-8.533-22.756,0-31.289l72.533-72.533l-72.533-72.533
	c-8.533-8.533-8.533-22.756,0-31.289c8.533-8.533,22.756-8.533,31.289,0l72.533,72.533l72.533-72.533
	c8.533-8.533,22.756-8.533,31.289,0c8.533,8.533,8.533,22.756,0,31.289l-72.533,72.533l72.533,72.533
	C339.911,308.622,339.911,322.844,331.378,331.378z"
              />
              <g>
</g>
              <g>
</g>
              <g>
</g>
              <g>
</g>
              <g>
</g>
              <g>
</g>
              <g>
</g>
              <g>
</g>
              <g>
</g>
              <g>
</g>
              <g>
</g>
              <g>
</g>
              <g>
</g>
              <g>
</g>
              <g>
</g>
</svg>

          </button>
        </div>

        <div class="modaldiolog__body">
          <slot name="body"/>
        </div>

        <div class="modaldiolog__footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {
      show: false
    }
  },
  methods: {
    closeModal () {
      this.show = false
      document.querySelector('body').classList.remove('overflow-hidden')
    },
    openModal () {
      this.show = true
      document.querySelector('body').classList.add('overflow-hidden')
    }
  }
}
</script>


<style lang="scss" scoped>
.modaldiolog {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;

  &__backdrop {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }

  &__dialog {
    background-color: #ffffff;
    position: relative;
    width: 600px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    z-index: 2;
    @media screen and (max-width: 992px) {
      width: 90%;
    }
  }

  &__close {
    width: 30px;
    height: 30px;
    background: none;
    border: none;
  }

  &__header {
    padding: 20px 20px 10px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__body {
    padding: 10px 20px 10px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  &__footer {
    padding: 10px 20px 20px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
